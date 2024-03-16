import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  removeProductById,
  updateProductById,
} from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProductById);
productRouter.delete("/:id", removeProductById);

export default productRouter;
