import Product from "../../models/products.js";

// Existing code
export const getProductsByCategoryId = async (req, reply) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.find({ category: categoryId })
      .select("-category")
      .exec();

    return reply.send(products);
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};

// 🔹 New: Search products by query
export const searchProducts = async (req, reply) => {
  const { query } = req.query; // frontend sends ?query=Potato

  try {
    const products = await Product.find({
      name: { $regex: query, $options: "i" } // "i" → case insensitive
    }).exec();

    return reply.send(products);
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};
