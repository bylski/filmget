import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, required: false, trim: true },
  signUpDate: { type: Date, required: true },
  avatarSrc: {
    url: { type: String, default: "", required: false },
    fileName: { type: String, default: "", required: false },
  },
  mediaToWatch: { type: Array, required: false },
  mediaIds: { type: Array, required: false },
  mediaRatings: { type: [{ id: Number, rating: Number,  _id: false}], required: false, },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
