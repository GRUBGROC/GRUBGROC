// import { getAllCategories } from "../controllers/product/category.js";
// import { getProductsByCategoryId, searchProducts } from "../controllers/product/product.js";

// export const categoryRoutes = async (fastify, options) => {
//   fastify.get("/categories", getAllCategories);
// };

// export const productRoutes = async (fastify, options) => {
//   fastify.get("/products/:categoryId", getProductsByCategoryId);

//   // 🔹 New search route
//   fastify.get("/products/search", searchProducts);
// };
import { getAllCategories } from "../controllers/product/category.js";
import { getProductsByCategoryId, searchProducts } from "../controllers/product/product.js";

export const categoryRoutes = async (fastify, options) => {
  fastify.get("/categories", getAllCategories);
};

export const productRoutes = async (fastify, options) => {
  // ✅ search first
  fastify.get("/products/search", searchProducts);
  fastify.get("/products/:categoryId", getProductsByCategoryId);
};
