import { broadcast } from "../ws/socket"
import { analyzeSignal } from "./analyzer"

let currentMode: "normal" | "spike" | "elevated" = "normal"

export function setMode(mode) {
  currentMode = mode
}

export function startSignalGenerator() {
  setInterval(() => {
    const reading = generateReading(currentMode)

    analyzeSignal(reading)

    broadcast("signal", reading)
  }, 1000)
}
