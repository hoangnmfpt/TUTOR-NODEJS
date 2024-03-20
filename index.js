import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/nodejs-xuong").then(() => {
  console.log("Connected to MongoDB!");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
