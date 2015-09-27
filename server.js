var express= require("express");
var cors = require("cors");

var app = express();

app.use(cors());

var contacts = [{
    name:"Thembani",
    email:"test@test.com",
    occupation:"web dev",
    age: 16
},{
    name:"Thembani2",
    email:"test@test2.com",
    occupation:"web designer",
    age: 16
}];

app.get("/contacts", function(req, res){
   res.status(200).json(contacts);
});

app.listen(9001);