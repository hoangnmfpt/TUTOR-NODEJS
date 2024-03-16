import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  removeProductById,
  softRemoveProductById,
  updateProductById,
} from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/update/:id", updateProductById);
productRouter.put("/hide/:id", softRemoveProductById);
productRouter.delete("/:id", removeProductById);

export default productRouter;
