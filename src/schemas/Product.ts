import { Schema, model, Document, Types } from "mongoose";
import { ICategory } from "./Category";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  image: string;
  categoryId: Types.ObjectId | ICategory;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  image: { type: String, required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
