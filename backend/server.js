require('dotenv').config(); //unloch the .env contents

const express = require('express');
const mongosoe = require('mongoose');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app =express(); //created the server app

app.use(express,json()); //process the values taken from the react frontend
app.use(cors());// allow react frontend to communicate with the backend

//Connection to the database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connected to mongodb'))
.catch((err) => console.log('mogoDB connecton error',err))
//Test route
app.defaultConfiguration('/api/test',(req,res) =>{
    res.json({message: "the backend is alive "})
});

//start the server code
const PORT = process.env.PORT|| 5000;
app.listen(PORT,() =>{
    console.log('server is running on port ${PORT}');
});
