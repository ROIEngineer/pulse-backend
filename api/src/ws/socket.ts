import { WebSocketServer } from "ws"

let wss: WebSocketServer 

export function initWebSocket(server) { 
  wss = new WebSocketServer({ server })

  wss.on("connection", (socket) => {
    console.log("Client connected")
  })
}

export function broadcast(event: string, payload: any) {
  if (!wss) return

  const message = JSON.stringify({ event, payload })

  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(message)
    }
  })
}

/*
Line 6 - Piggyback on the existing http.Server rather than open its own port. 
Internally, the ws library registers itself on the http.Server's upgrade event, 
so when a client tries to initiate a WebSocket connection, 
the http.Server knows to hand it off to wss instead of Express.

Line 8 - Registers a listener on wss for the "connection" event. 
This event fires every time a new client successfully completes the WebSocket handshake. 
When it fires, the callback receives socket, which is a unique object representing that one client's open connection. 
Right now it just logs, but this is where you'd put any logic you want to run for each individual client.

Line 18 - wss.clients — a built-in Set that ws automatically maintains. When a client connects, ws adds them. 
When they disconnect, ws removes them. You never manage this manually.

Line 20 - client.readyState === 1 — checks that the client's connection is still open. 
1 corresponds to the OPEN state. You check this because a client might be in the process of disconnecting, 
and trying to send to a closing connection would throw an error.

This file defines the WebSocket server and provides a function to broadcast messages to all connected clients. 
It initializes the WebSocket server using the existing HTTP server and listens for incoming connections, 
allowing real-time communication between the server and clients.
*/ 