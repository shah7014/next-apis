import { models, model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is a required field"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Category description is a required field"],
  },
  colour: {
    type: String,
    enum: {
      values: ["RED", "BLUE", "GREEN", "YELLOW", "VIOLET", "INDIGO", "ORANGE"],
      message: "{VALUE} is not a valid status",
    },
    default: "ORANGE",
  },
});

const Category = models.Category || model("Category", categorySchema);

export default Category;
