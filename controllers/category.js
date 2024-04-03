import { errorMessages, successMessages } from "../constants/message.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const getCategories = async (req, res, next) => {
  try {
    const data = await Category.find({}).populate("products");
    if (data && data.length > 0) {
      return res.status(200).json({
        message: "Lay danh sach danh muc thanh cong!",
        data,
      });
    }
    return res.status(404).json({ message: "Khong co danh muc nao!" });
  } catch (error) {
    next(error);
  }
};
export const createCategory = async (req, res, next) => {
  try {
    const data = await Category.create(req.body);
    if (!data) {
      return res.status(400).json({ message: "Them danh muc that bai!" });
    }
    return res.status(201).json({
      message: "Them danh muc thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findById(req.params.id).populate("products");
    if (!data) {
      return res.status(400).json({ message: "Lay danh muc that bai!" });
    }
    return res.status(201).json({
      message: "Lay danh muc thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(
      `${req.params.id}`,
      req.body,
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(400).json({ message: errorMessages.UPDATE_FAIL });
    }
    return res.status(201).json({
      message: successMessages.UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ! Xoá cứng! Không dùng
export const removeCategoryById = async (req, res, next) => {
  try {
    if (req.params.id === "660d72178414e74a3907abdd") {
      return res.status(400).json({
        message: "Không thể xoá danh mục mặc định!",
      });
    }

    // ! cap nhat lại san pham cho danh muc bị xoá
    const productsToUpdate = await Product.find({ category: req.params.id });
    await Promise.all(
      productsToUpdate.map(async (product) => {
        product.category = "660d72178414e74a3907abdd";
        await product.save();
      })
    );

    const data = await Category.findByIdAndDelete(req.params.id);
    if (data) {
      return res.status(200).json({
        message: successMessages?.DELETE_CATEGORY_SUCCESS || "Successfully!",
        data,
      });
    }
    return res.status(400).json({ message: errorMessages.DELETE_FAIL });
  } catch (error) {
    next(error);
  }
};

// ! Xoá mềm
export const softRemoveCategoryById = async (req, res, next) => {
  try {
    const data = await Category.findByIdAndUpdate(
      `${req.params.id}`,
      {
        hide: true,
      },
      {
        new: true,
      }
    );
    //! findByIdAndUpdate !== findByIdAndRemove
    if (!data) {
      return res.status(400).json({ message: "Cap nhat danh muc that bai!" });
    }
    return res.status(201).json({
      message: "Cap nhat danh muc thanh cong!",
      data,
    });
  } catch (error) {
    next(error);
  }
};
