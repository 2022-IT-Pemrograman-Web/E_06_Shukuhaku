const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const entry = require('./routes/entry');
const { adminAuth, userAuth } = require("./middlewares/auth.js");

const app = express();

app.set('secretKey', 'MR3Srs7tq410NPyHH79fmbXju2pxEdiAzjglaMXTIsdebgxJJmwBGHqa7yYrJyZ');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', function(req, res){
    res.json({"title" : "FP PWEB REST API with node.js"});
});

app.use('/', entry);

app.listen(3000, function(){
    console.log('Node server listening on port 3000');
});