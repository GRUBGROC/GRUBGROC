import mongoose from "mongoose";

const productScehma = new mongoose.Schema({
  name: { type: String, required: true },
  discription: { type: String, required: false },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  quantity: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = mongoose.model("Product", productScehma);

export default Product;
