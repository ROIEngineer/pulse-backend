import express from "express" 
import http from "http" 
import { initWebSocket } from "./ws/socket" 
import simulateRouter from "./routes/simulate" 

export function createServer() {
  const app = express() 
  app.use(express.json()) 

  app.use("/simulate", simulateRouter) 

  const server = http.createServer(app)   

  initWebSocket(server) 

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

One server, two protocols: HTTP for RESTful API and WebSocket for real-time communication.

This file sets up the Express server and integrates the WebSocket server. It also defines the API routes and starts listening for incoming connections on port 4000.
*/