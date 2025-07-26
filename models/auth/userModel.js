import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Email should be in a valid format",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      select: false,
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // to reset the password if user forgets the password
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    // to make a user verified
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// pre-save hooks
userSchema.pre("save", async function (next) {
  // Very important line. if not added
  // it might again hahsh an already hashed password and in turn destroying the login flow
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
