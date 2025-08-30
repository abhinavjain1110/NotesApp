import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, default: "" },
    provider: { type: String, enum: ["email", "google"], required: true },
    // OTP login fields
    otpHash: { type: String },
    otpExpiresAt: { type: Date },
    // Google auth fields
    googleId: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
