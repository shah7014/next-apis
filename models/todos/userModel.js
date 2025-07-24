import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "A username is a required field"],
      minlength: [5, "A username must be atleast 5 chars long"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "An email is a required field"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;
