import { Schema, models, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A todo must have a title"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: ["PENDING", "IN_PROGRESS", "DONE"],
        message: "{VALUE} is not a valid todo status",
      },
      default: "PENDING",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = models.Todo || model("Todo", todoSchema);

export default Todo;
