var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reportDB', {userMongoClient:true});

var reportSchema = mongoose.Schema({
  Title:String,
  Report:String
});

var Report = mongoose.model('Report', reportSchema);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("connected")});

router.get('/fake', function(req, res, next) {
  console.log("FAKE");
  var fakelist = [{Title:"Jim", Report:"Hi"}];
  res.json(fakelist);
});

router.get('/report', function(req,res,next) {
  console.log("Report");
  Report.find(function(err, reportList) {
    if(err) return console.error(err);
    else {
      console.log(reportList);
      res.json(reportList);
    }
  });  
});


router.post('/report', function(req, res, next) {
  console.log("Report Post");
  console.log("req.body");
  var newReport = new Report(req.body);
  newReport.save(function(err, post) {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});



router.post('/report', function(req, res, next) {
  console.log("delete")
  Report.remove({}, function(err, removed) {
    if(err) return console.error(err);
    console.log(removed);
  })

});

/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
module.exports = router;
