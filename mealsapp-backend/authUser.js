const jwt = require('jsonwebtoken');
const userModel = require('./userModel');

//function which do auto login -- we send from frontend usersToken which exist and by checking here if the decoded token of this token exist we after that can get other url`s which are onlu for logged in users ( with tokens)

const authUser = async (req, res, next)=>{
	try {
	    const userToken = req.header('Authorization').replace('Bearer ',""); //token we got from user
	    const decodedToken  =jwt.verify(userToken, 'mealsSecret'); //the decoded token from user
	    const user = await userModel.findOne({ _id: decodedToken._id});//checking the decoded token with the token is already exists on this user
	    if(!user){ //if this user with decoded token does not match -- does not exist so pls login
		    return res.status(404).json('please login');
	    }
	    req.user = user; //otherwise = user exist and we save his decoded token
	    next();
	} catch (error) {
		console.log(error);
		res.status(500).send();
		
	}
}
module.exports = authUser;