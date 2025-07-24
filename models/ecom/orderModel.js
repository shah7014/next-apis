import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ["PENDING", "COD", "CARD", "UPI", "C2", "WALLET"],
        message: "{VALUE} is not a valid payment method",
      },
      default: "PENDING",
    },
    orderStatus: {
      type: String,
      enum: ["PENDING", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
