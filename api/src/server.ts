import express from "express" // Express framework for building web applications and APIs
import http from "http" // Built-in Node.js module for creating HTTP server
import { initWebSocket } from "./ws/socket" // Function to initialize WebSocket server
import simulateRouter from "./routes/simulate" // Router for handling simulation-related API endpoints

export function createServer() { // Function to create and start the Express server
  const app = express() // Create an instance of the Express application
  app.use(express.json()) // Middleware to parse incoming JSON requests

  app.use("/simulate", simulateRouter) // Use the simulateRouter for handling routes under the "/simulate" path

  const server = http.createServer(app) // Create an HTTP server using the Express app     

  initWebSocket(server) // Initialize the WebSocket server, passing the HTTP server to it

  server.listen(4000, () => {
    console.log("API running on port 4000")
  })

  return server
}

/*
Line 12 - The reason you need the raw HTTP server (http.createServer) is that Express alone is just 
the dining room manager — it can't run the intercom system by itself. 
You need the actual building infrastructure to support both. So you build the building first, 
hand Express one part of it, and hand WebSocket the intercom system in the same building.
*/

/*
One server, two protocols: HTTP for RESTful API and WebSocket for real-time communication.
*/