import mongoose from "mongoose";
import { DB_URI } from "./env.js";
const connect = () => {
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connect;
