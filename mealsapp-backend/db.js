const mongoose = require('mongoose');
const uri = `mongodb+srv://artiom:uv3sEHeI5eFpTf3E@cluster0.mcpkj.mongodb.net/mealsApp?retryWrites=true&w=majority`;


//connection to our database
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
	console.log("connected to database")
}).catch(err=> console.log(err))