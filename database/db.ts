import mongoose from "mongoose"
mongoose.set("strictQuery", true)

/**
 * 0 => Disconnected
 * 1 => Connected
 * 2 => Connecting
 * 3 => Disconnecting
 */

const mongoConnection = {
  isConnected: 0,
}

export const connect = async () => {
  if (mongoConnection.isConnected !== 0) {
    return
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState
    if (mongoConnection.isConnected === 1) {
      return
    }

    await mongoose.disconnect()
  }
  const db = await mongoose.connect(process.env.MONGODB_URI || "")

  mongoConnection.isConnected = 1

  console.log("MongoDB Connected")
}

export const disconnect = async () => {
  if (mongoConnection.isConnected === 0) {
    return
  }

  if (mongoose.connections.length > 0) {
    await mongoose.disconnect()
    mongoConnection.isConnected = 0
  }
  console.log("MongoDB Disconnected")
}
