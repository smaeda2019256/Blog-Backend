"use strict";

import mongoose from "mongoose";

export const dbConnectionBlog = async () => {
  try {
    mongoose.connection.on("error", () => {
      console.log("MongoDB || could not be connect to mongodb");
      mongoose.disconnect();
    });
    mongoose.connection.on("connecting", () => {
      console.log("MongoDB || Try connecting");
    });
    mongoose.connection.on("connected", () => {
      console.log("MongoDB || connected to mongoDB");
    });
    mongoose.connection.on("open", () => {
      console.log("MongoDB || connected to dabase");
    });
    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB || reconnected to MongoDB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB || disconnected");
    });

    await mongoose.connect(process.env.MONGO_DB_BLOG, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 50,
    });
  } catch (error) {
    console.log("Databse connection failed-sorry :(");
  }
};
