import mongoose, { ConnectOptions } from "mongoose";

const connection = { isConnected: 0 };

async function dbConnect() {
  if (connection.isConnected) return;

  if (!process.env.DB_URI)
    throw new Error("DB_URI Doesn't exist in environment variables");

  const db = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  } as ConnectOptions);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
