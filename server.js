'use strict';

const express = require('express');
const app = express();

const cors = require('cors');

// require and use "multer"...
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/images'
});

//init upload
const upload = multer({
    storage: storage
}).single('upfile');


app.post('/api/fileanalyse', (req,res) => {
   upload(req, res, (err) => {
       if (err) throw err;
       res.send({
           "name": req.file.filename,
           "type": req.file.mimetype,
           "size": req.file.size

       })
   })
});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
