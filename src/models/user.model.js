const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      default: true,
    },
    email: {
      type: String,
      unique: true,
    },
    roll: {
      type: Number,
    },
    image: {
      type: String,
      default:
        "C:\Users\Gopal Ch. Pandit\OneDrive\Pictures\Screenshots\Screenshot 2026-10-12 092435.png",
    },
    address: {
      type: Object,
    },
    password: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const usermodel = mongoose.model("user", userSchema);
module.exports = usermodel;
