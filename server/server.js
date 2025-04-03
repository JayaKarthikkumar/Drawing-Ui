const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set();
let drawingHistory = []; // Store past drawings

wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("A user connected.");

    // Send existing drawing history to the new user
    ws.send(JSON.stringify({ history: drawingHistory }));

    // Notify all clients that a new user joined
    broadcast({ message: "A new user joined!" });

    ws.on("message", (message) => {
        const data = JSON.parse(message);
    
        if (data.clear) {
            drawingHistory = []; // Reset drawing history
            broadcast(data, ws);
        } else {
            drawingHistory.push(data); // Save new drawing action
            broadcast(data, ws);
        }
    });
    

    ws.on("close", () => {
        clients.delete(ws);
        broadcast({ message: "A user left the session." });
    });
});

function broadcast(data) {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

console.log("WebSocket server running on ws://localhost:8080");
