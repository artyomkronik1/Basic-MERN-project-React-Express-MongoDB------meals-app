const router  = require('express').Router();
const UserModel = require('./userModel');
const authUser = require('./authUser');
router.post('/users', async(req, res)=>{ //POST method --- creating new user to database by req.body on './users' url
 try {
  const user = await UserModel.create(req.body); //creating user by its Model and by the body the client sent
 await user.generateToken(); //giving a token to user to work with user by this token -- so show him a new pages only for him by his own token
  res.send(user);	//sending it back as a json to frontend
 } catch (error) {
   res.status(500).send()	 
 }	
})


router.post('/login', async(req, res)=>{ //POST method --- login with user to database by req.body on './login' url
 const {email, password} = req.body;
 try {
   const user  = await UserModel.findByCredentials(email,password); //intire function into userModel that checks if user exists in database
 await user.generateToken(); //giving a token to user to work with user by this token -- so show him a new pages only for him by his own token
   res.status(200).send(user); //sending back 200 code and user who logged in
  console.log("success to login");
  } catch (error) {
   console.log(error);
   res.status(500).send();
 }	
})


router.post('/auto-login', authUser ,async(req,res)=>{ //to get '/auto-login' url (its for logged in already users) we must do authUser function -- is the function which checks the tokens of logged in user(if this user exists by its token)
  res.send(req.user);
})


router.post('/logout', authUser ,async(req,res)=>{ //logout deleting users token
  const user  = req.user;
  user.token = '';
  await user.save();
  res.status(200).send();
})


router.post('/add-favorites', authUser ,async(req,res)=>{ //adding meal to favorites by its id we get from req
 const {mealId} = req.body;
 const user= req.user;
user.favorites.push(mealId);
await user.save();
res.status(200).send(user);
console.log(user.favorites.length);
 
})


router.post('/remove-favorites', authUser ,async(req,res)=>{ //renoving meal from favorites by its id we get from req
 const {mealId} = req.body;
 const user= req.user;
user.favorites= user.favorites.filter(id=>id!==mealId)
await user.save();
res.status(200).send(user);
 
})


module.exports = router;