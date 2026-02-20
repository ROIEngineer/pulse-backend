import { createServer } from "./server"
import { startSignalGenerator } from "./signals/generator"

async function bootstrap() { 
  const appServer = await createServer() 
  startSignalGenerator() 
  console.log("System online.") 
}

bootstrap() 

// This file is the entry point of the application. It initializes the server and starts the signal generator, effectively bringing the entire system online.
