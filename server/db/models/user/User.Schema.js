import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: [20, "Username must be less than 20 characters"],
    },
    email: {
      type: String,
      required: true,
      //   index: 1,
      unique: true,
      maxlength: [50, "Email must be less than 50 characters"],
    },
    password: {
      type: String,
      required: true,
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
