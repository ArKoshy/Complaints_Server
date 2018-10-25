//Declarations 
const express = require('express');
var mongoose = require('./Mongoose/mongo_setup'); 
var {Complaints} = require('./Models/complaintMod');
var app = express();
var bodyParser =require('body-parser'); // to handle the JSON coming in 
app.use(bodyParser.json()); //BodyParser will act as middleware to parse the data
const port =process.env.PORT || 3000;
var uniqueKey =null;

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
app.post('/submit',(req,res)=>{
       uniqueKey = new Date().getTime();
      // console.log('Unique Key',uniqueKey);
   var complaints = new Complaints({
       docKey: uniqueKey,
       userName: req.body.userName,
       mobile:req.body.mobile,
       email:req.body.email,
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

//Database full read
app.get('/complaints',(req,res)=>{
 
    
    Complaints.find({}).then((data)=>{
      res.send(data);
  }).catch((err)=>{            
      res.send(err)
  })
  
  } 
  );

//Database Read by docKey
app.get('/track/:docKey',(req,res)=>{
 
  var docID = parseInt(req.params.docKey);
  Complaints.find({docKey:docID}).then((data)=>{
    res.send(data);
}).catch((err)=>{            
    res.send(err)
})

} 
);
//Database Update
app.put('/update',(req,res)=> {
   
    console.log('inside put docKey:',req.body);
   
    
    var complaints = new Complaints({
        
        docKey: req.body.keyID,
        userName: req.body.userName,
        mobile:req.body.mobile,
        email:req.body.email,
        compType:req.body.compType,
        descr:req.body.descr,
        status:req.body.status,
        adminComment:req.body.adminComment
    });

    console.log('inside put comps:',complaints);
    Complaints.updateOne(
        {docKey: complaints.docKey },
        {
                $set:{  
                //userName: req.body.userName,
                mobile:complaints.mobile,
                email:complaints.email,
                compType:complaints.compType,
                descr:complaints.descr,
                status:complaints.status
                }
         },
       
        {
            new: true
        },
        function(err,data){
            if (err){
                res.send(err)
             //   console.log("inside update app err:");
            } else{
                res.json(data) 
             //   console.log("inside update app:",res.json(data));
            }
        }
               )
       
});


//Database delete by docKey
app.delete ('/delete/:docKey',(req,res)=>{
 
    var docID = parseInt(req.params.docKey);
    console.log("del param:",docID);
    Complaints.deleteOne({docKey:docID}).then((data)=>{
      res.send(data);
  }).catch((err)=>{            
      res.send(err)
  })
  
  } 
  );

//assigning port
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});
