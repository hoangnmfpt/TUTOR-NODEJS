import { Router } from "express";
import validBodyRequest from "../middlewares/validRequestBody.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAdmin.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  removeCategoryById,
  softRemoveCategoryById,
  updateCategoryById,
} from "../controllers/category.js";
import categorySchema from "../validations/category.js";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);

categoryRouter.use(checkAuth, checkIsAdmin);
categoryRouter.put("/hide/:id", softRemoveCategoryById);
categoryRouter.delete("/delete/:id", removeCategoryById);

categoryRouter.use(validBodyRequest(categorySchema)); // middleware
categoryRouter.post("/", createCategory);
categoryRouter.put("/update/:id", updateCategoryById);

export default categoryRouter;
