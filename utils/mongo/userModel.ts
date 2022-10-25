import mongoose, { Schema } from "mongoose";

const AvatarSchema = new Schema({
  url: String,
  fileName: String,
})

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, required: false, trim: true },
  signUpDate: {type: Date, required: true},
  avatarSrc: {type: AvatarSchema, required: false},
  mediaToWatch: {type: Array, required: false },
});



export const User = mongoose.models.User || mongoose.model('User', userSchema);