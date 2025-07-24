import mongoose from "mongoose";

const DB_URI = process.env.DATABASE_URI;

if (!DB_URI) {
  throw new Error("Databse URI must be defined in .env file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

export async function connectToDB() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(DB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.connection = await cached.promise;
    return cached.connection;
  } catch (error) {
    console.log("ERROR:- ", error);
    throw error;
  }
}
