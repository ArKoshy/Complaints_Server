//This model will contain the structure of the Complaint passed around.

var mongoose = require('mongoose'); 

var Complaints = mongoose.model('Complaints',{
username:{
    type:String,
  //  required:true,
    minlength:2},
contact:{type:String},
compType:{type:String},
descr:{type:String},
status:{type:String}
})

module.exports = {Complaints};

