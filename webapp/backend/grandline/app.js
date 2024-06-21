// index.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', async (req, res) => {
    console.log("about to send message")
    const response = await axios.get('http://luffy.default.svc.cluster.local');
    console.log('Response:', response.data);

    // Send the response from the external server back to the original caller
    res.send(response.data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/*

1. You can't identify the source of a web socket and socket connections shouldn't be saved in db
    you could use IP, but this is not guaranteed
    With signed-in, u can use a user_id to identify them


1. You have a websocket connection from one client to one server
To add another client, then you need another client to server connection

    1a. When client requests a socket connection, a new connection is created, ws.
    For 5 client to server connections you will have 5 ws

2. The handler for when new messages come to the server is the same for all clients.
This means that using ws, you will have to make distinguished logic

    2a. eg: Generate a hash, and add it to a dict d.update({<hash>: [ws]})
            You can add more ws to that list, so now multiple ws are connected to same "channel"

ws which is the connection, provides you with a lot of state and functionality
    ws.send(<data>)
    ws.close() / ws.terminate()
    ws.readyState == [ws.CONNECTING, ws.OPEN, ws.CLOSED]

In ws connection, during socket close
    think of what data u want to preserve, and what data u are better off restarting
    eg: score vs current state of a pong game

*/

const WebSocket = require('ws');

const port = 8080;

const wss = new WebSocket.Server({ port });


clients = []

wss.on("connection", (ws) => {
    console.log("New client connected!");

    clients.push(ws)

    ws.send("Welcome, you are connected!");

    ws.on("message", (data) => {
        console.log(`Client sent: ${data}`);
        ws.send(`You sent: ${data}`);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log(`Server listening on port ${port}`);



