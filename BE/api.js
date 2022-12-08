const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
var cors = require('cors')
const entry = require('./routes/entry');
const users = require('./routes/users');
const { adminAuth, userAuth } = require("./middlewares/auth.js");

const app = express();

app.set('secretKey', 'MR3Srs7tq410NPyHH79fmbXju2pxEdiAzjglaMXTIsdebgxJJmwBGHqa7yYrJyZ');

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get('/', function(req, res){
    res.json({"title" : "FP PWEB REST API with node.js"});
});

app.use('/', entry);
app.use('/user', userAuth, users);

app.listen(3000, function(){
    console.log('Node server listening on port 3000');
});