//Declarations 
const express = require('express');
var mongoose = require('./Mongoose/mongo_setup'); 
var {Complaints} = require('./Models/complaintMod');
var app = express();
var bodyParser =require('body-parser'); // to handle the JSON coming in 
app.use(bodyParser.json()); //BodyParser will act as middleware to parse the data
const port =process.env.PORT || 3000;

// For CORS,Pgm Line no 9 to 26
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//*****************Routing Section**************************************/


//Database Entry
app.post('/entry',(req,res)=>{
    
   var complaints = new Complaints({
       username: req.body.username,
       contact:req.body.contact,
       compType:req.body.compType,
       descr:req.body.descr,
       status:req.body.status
   });
   
   complaints.save().then((data)=>{
       res.send(data);
   },(err)=>{
       res.send(err);
   }); 
});



//assigning port
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});
