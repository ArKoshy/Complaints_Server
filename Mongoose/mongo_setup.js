//mongoose setup
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//create a db called Complaints and establish connection
mongoose.connect('mongodb://localhost:27017/Complaints',{ useNewUrlParser: true }); 

//make module exportable
module.exports={
    mongoose:mongoose  //assigned the mongoose created above to mongoose object here to return
}