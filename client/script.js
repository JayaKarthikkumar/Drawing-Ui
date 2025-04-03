const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearCanvas = document.getElementById("clearCanvas");

const ws = new WebSocket("ws://localhost:8080");

let drawing = false;
let color = "#000000";
let size = 3;

// Set canvas size dynamically
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;

// Start drawing
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    draw(e);
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
});

// Draw and send data
canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    const drawData = { x, y, color, size };

    drawOnCanvas(drawData, false); 
    ws.send(JSON.stringify(drawData)); 
});


// Draw function
function drawOnCanvas({ x, y, color, size }, isRemote) {
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";

    if (!isRemote) ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.stroke();
}

// WebSocket message handling (User notifications, history, and clear event)
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.message) {
        displayNotification(data.message); // Show join/leave messages
        return;
    }

    if (data.history) {
        // Load previous drawing history for new users
        data.history.forEach((drawData) => drawOnCanvas(drawData, true));
        return;
    }

    if (data.clear) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    drawOnCanvas(data, true); // Draw received data
};


// Function to display messages in the frontend
function displayNotification(message) {
    const messageBox = document.getElementById("messages");

   
    if (!messageBox) {
        console.error("Message box not found!");
        return;
    }

    messageBox.textContent = message; // Update message content
    messageBox.style.display = "block"; // Ensure it's visible

    // Auto-remove messages after 5 seconds
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 5000);
}

// Update color & size
colorPicker.addEventListener("input", (e) => (color = e.target.value));
brushSize.addEventListener("input", (e) => (size = e.target.value));

// Clear canvas
clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ws.send(JSON.stringify({ clear: true })); // Notify others
});
