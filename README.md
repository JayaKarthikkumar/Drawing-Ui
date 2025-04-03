# Real-Time Collaborative Drawing App

A web-based collaborative drawing application where multiple users can draw on a shared canvas in real-time. The app uses WebSockets to enable live synchronization across all connected users.

## 🚀 Features
- 🎨 Real-time collaborative drawing using WebSockets
- 🖌️ Customizable brush size and color
- 🗑️ Clear canvas functionality for all users
- 📜 Drawing history persists for new users
- 🔔 User join/leave notifications

## 🛠️ Technologies Used
- **Frontend:** HTML5, CSS, JavaScript, Canvas API
- **Backend:** Node.js, Express, WebSocket (ws)

## 📂 Project Structure
```
collab-draw/
│── server/            # Backend files
│   ├── server.js      # WebSocket server
│── public/            # Frontend files
│   ├── index.html     # Main UI
│   ├── styles.css     # Styling
│   ├── script.js      # Client-side logic
│── README.md          # Project documentation
│── package.json       # Node.js dependencies
```

## ⚡ Setup and Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/collab-draw.git
cd collab-draw
```

### 2️⃣ Install Dependencies
Ensure you have **Node.js** installed, then run:
```sh
npm install
```

### 3️⃣ Start the WebSocket Server
```sh
node server/server.js
```

### 4️⃣ Open the App
Open `index.html` in a browser or start a local server:
```sh
npx live-server public
```

## 🖥️ Usage
1. Open the app in multiple tabs or devices.
2. Select a brush color and size.
3. Start drawing and see changes in real-time.
4. Clear the canvas to remove all drawings.

## 🛠️ Customization
- Modify `styles.css` to change UI appearance.
- Edit `script.js` to add more features.
- Extend `server.js` for additional server-side functionality.



