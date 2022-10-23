import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, required: false, trim: true },
  // signUpDate: {type: Date, required: true},
  // avatarSrc: {type: String, required: false},
  // mediaToWatch: {type: Array, required: false },
});



export const User = mongoose.models.User || mongoose.model('User', userSchema);