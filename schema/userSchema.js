import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
  },
  wishlist: {
    type: Array,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
});

const user = mongoose.model("user", userSchema);
export default user;
