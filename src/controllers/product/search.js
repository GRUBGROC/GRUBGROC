// GET /products/search?query=milk
import Product from "../../models/products.js";

export const searchProducts = async (req, reply) => {
  const { query } = req.query;

  try {
    const products = await Product.find({
      name: { $regex: query, $options: 'i' } // case-insensitive search
    }).exec();

    return reply.send(products);
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};
