const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  
  bookname: {type: String,required:true, trim: true},
  author:{type: String, required:true, trim: true},
  price:{type: Number, required:true, trim:true},
  description:{type: String, required: false},
  images: [String],

  
  email: { type: String, required: false },
  phone: { type: Number, minlength: 10, required: false },
  
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Book", bookSchema);
