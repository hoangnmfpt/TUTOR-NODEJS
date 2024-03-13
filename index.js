import express from "express";
import axios from "axios";
const PORT = 8000;
const app = express();

// app.use("/", (req, res) => {
//   res.send("root router");
// }); // middleware

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    // "Content-Type": "application/json",
  },
});
// app.use(express.json());

app.get("/products", (req, res) => {
  res.send("Hello World");
});

app.post("/products", async (req, res) => {
  try {
    const data = await instance.post("/products", req.body);
    if (!data) {
      return res.status(400).json({ message: "Them san pham that bai!" });
    }
    return res.status(201).json({
      message: "Them san pham thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({ name: error.name, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
