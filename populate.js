import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import Job from "./models/Job.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // deletes all the jobs in the database, so we have a clean start

    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
    );
    //we can pass the array into the Jobs model to make them all at once
    await Job.create(jsonProducts);
    console.log("Success!");
    process.exit(0); // optional, just to showcase you can exit this way
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
