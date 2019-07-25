const express = require('express');
const router = express.Router();
const fs = require('fs')
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


var dir = require('../config/image_dir').image_path
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const multer = require('multer')

function httpGetAsync(theUrl, res,callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("get", theUrl, true); // true for asynchronous

    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText,res);
    }
    xmlHttp.send('name=12')
}

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        
        callback(null, Date.now()+'.jpg');
    }
});
var upload = multer({storage: storage}).single('myFile')

router.get('/', ensureAuthenticated, (req, res) => {
  res.render('image')
  console.log(__dirname)

});


router.post('/upload',ensureAuthenticated,(req, res, next) => {
    upload(req, res, function (err) {

        if (err) {
            return res.end("Something went wrong:(");
        }else{
            httpGetAsync('http://127.0.0.1:5001/',res,(text)=>{
                console.log(text)
                res.send('答案是'+text)
            })
            
        }
    });

})


    
module.exports = router