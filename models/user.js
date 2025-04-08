import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    unique: true, // Ensure usernames are unique
    minlength: [8, 'Username must be at least 8 characters long!'],
    maxlength: [20, 'Username must not exceed 20 characters!'],
    match: [/^[a-zA-Z0-9._]+$/, "Username can only contain letters, numbers, dots, and underscores!"],
  },
  image: {
    type: String,
  }
});

// Ensure the model is not redefined
const User = models.User || model("User", UserSchema);

export default User;
