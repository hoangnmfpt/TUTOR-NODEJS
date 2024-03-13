import express from "express";
import axios from "axios";
const PORT = 8000;
const app = express();

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const { data } = await instance.get("/products");
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach san pham thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co san pham nao!" });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { data } = await instance.post("/products", req.body);
    if (!data) {
      return res.status(400).json({ message: "Them san pham that bai!" });
    }
    return res.status(201).json({
      message: "Them san pham thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { data } = await instance.get(`/products/${req.params.id}`);
    if (!data) {
      return res.status(400).json({ message: "Lay san pham that bai!" });
    }
    return res.status(201).json({
      message: "Lay san pham thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { data } = await instance.put(`/products/${req.params.id}`, req.body);
    if (!data) {
      return res.status(400).json({ message: "Cap nhat san pham that bai!" });
    }
    return res.status(201).json({
      message: "Cap nhat san pham thanh cong!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
