var mysql = require('mysql');
var b=0;
var express = require("express");
var ejs = require('ejs');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "1",
database: "swetha"
});

app.get("/", (req, res) => {
res.sendFile(__dirname + "/Registeration.html");
})


app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
  })

app.post('/register',function(req,res,next)
{
  var postData=req.body;
  console.log(postData);
  var name = req.body.Username;
  var password = req.body.password;
  var email=req.body.email;
  var dateofbirth=req.body.dateofbirth;
  console.log("details"+name,password,email,dateofbirth);
con.query("Insert into Registeration (Username,password,email,dateofbirth) VALUES ('"+req.body.Username+"','"+req.body.password+"','"+req.body.email+"','"+req.body.dateofbirth+"')",function(err, result)      
{                                                      
  if (err)
     throw err;
     res.sendFile(__dirname + "/login.html");
});


})
app.post('/login',function(req,res,next)
{
  var postData=req.body;
  console.log(postData);
  var name = req.body.Username;
  var password = req.body.password;
  console.log("details"+name,password);
  con.query("SELECT Username, Password FROM Registeration", function (err, result, fields) {
  if (err) throw err;
  var length=result.length;
  console.log("length"+length);
 

  for(var i=0;i<=length-1;i++)
  {
    console.log(result[i].Username);
    console.log(result[i].Password);
    if((result[i].Username==name) && (result[i].Password==password))
    {
      res.sendFile(__dirname + "/welcome.html");
    }
    else{
      
     b=1;
    }
  
  }
  //console.log(result[i].Username);
  if(b==1)
  {
    res.sendFile(__dirname + "/error.html");
  }
 
});

})

app.listen(port, () => {
console.log("Server listening on port " + port);
});