import express from "express";
import axios from "axios";
import {
  createProduct,
  getProductById,
  getProducts,
  removeProductById,
  updateProductById,
} from "./controllers/product.js";
const PORT = 8000;
const app = express();

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
app.use(express.json());

app.get("/products", getProducts);

app.post("/products", createProduct);

app.get("/products/:id", getProductById);

app.put("/products/:id", updateProductById);

app.delete("/products/:id", removeProductById);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
