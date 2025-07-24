import { Schema, models, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    email: {
      unique: true,
      required: true,
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = models.User || model("User", userSchema);

export default User;
