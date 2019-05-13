const mongoose = require("mongoose");
const uniqueValidator=require('mongoose-unique-validator')//for send error when we try insert to bd existing email
const userSchema = mongoose.Schema({
  _userName: { type: String, required: true },
  _email: { type: String, required: true,unique: true},
  _password:{type:String,required:true},
  _phone: { type: Number, required: true }
});

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model("User", userSchema);
