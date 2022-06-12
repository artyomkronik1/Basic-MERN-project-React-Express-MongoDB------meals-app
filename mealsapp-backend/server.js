const express = require('express');
const userRoutes = require('./userRoutes');
const cors = require('cors');
const app = express();

require('./db')


app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json()); //using json on express --> our data is on JSON
app.use(userRoutes); //using the routes - on the routes by each url there is other method


app.listen(5000,()=>{
  console.log("server running on 5000 post");
})