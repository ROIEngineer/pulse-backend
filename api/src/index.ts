import { createServer } from "./server"
import { startSignalGenerator } from "./signals/generator"

async function bootstrap() {
  const appServer = await createServer()
  startSignalGenerator()
  console.log("System online.")
}

bootstrap()
