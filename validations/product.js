import Joi from "joi";
const productSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  price: Joi.number().required().min(0),
  description: Joi.string().min(3),
  hide: Joi.boolean(),
  discountPercentage: Joi.number().min(0).max(100),
  rating: Joi.number().min(0).max(5),
  stock: Joi.number().min(0),
  brand: Joi.string().min(3).max(255),
  category: Joi.string().min(3).max(255),
  thumbnail: Joi.string(),
  images: Joi.array().items(Joi.string()),
});

export default productSchema;
