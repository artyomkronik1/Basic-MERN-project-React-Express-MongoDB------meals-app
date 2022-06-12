const mongoose = require('mongoose')
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken')
const userSchema = new mongoose.Schema({
 email:{
  type:String,
  required:true,
  unique:true,
 },
 password:{
   type:String,
   required:true
 },
 token:{
  type:String
 },
 favorites:{
   type:[String]
 },
})
//our user model - by this we create users and push them to mongo


userSchema.pre('save', async function(next){ //hashing the password by bcrypt
	const user = this;
	if(user.isModified('password')){
	user.password = await bcrypt.hashSync(user.password, 10);
	}
	next();
})


userSchema.statics.findByCredentials = async function (email, password){
  const user = await User.findOne({email}); //finding first of all user by the email
  if(!user){
    throw new Error('Email does not exist')
  }
  const passwordMatch = await bcrypt.compareSync(password, user.password); //there - comparing the passwords
  if(!passwordMatch){
        throw new Error('Invalid password')
  }
  return user; //and then return the user logged in
}

userSchema.methods.generateToken = async function (){ //create token for the user JWT
  const user = this;
  const token = await jwt.sign({_id: user._id}, "mealsSecret", {expiresIn:"10h"});
  user.token = token;
  await user.save();
  return token;

}
userSchema.methods.toJSON = function(){ //removing info -- dont send user pass and id to server, only token and email ---- for security
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject._id;
  return userObject;
}
const User = mongoose.model('User', userSchema); //creating the (User == userSchema) model
module.exports  = User;