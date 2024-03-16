import express from "express";
import router from "./routes/index.js";
const PORT = 8000;
const app = express();

app.use(express.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
