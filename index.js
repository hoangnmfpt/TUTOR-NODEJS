import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
const PORT = 8000;
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce").then(() => {
  console.log("Connected to MongoDB!");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
