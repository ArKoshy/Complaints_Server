//This model will contain the structure of the Complaint passed around.

var mongoose = require('mongoose'); 

var Complaints = mongoose.model('Complaints',{

docKey:{
    type:Number},       
userName:{
    type:String,
    minlength:3},
mobile:{
    type:String},
email:{
    type:String},
compType:{
    type:String},
descr:{
    type:String},
status:{
    type:String},
adminComment:{
    type:String}
})

module.exports = {Complaints};

