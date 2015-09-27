var express= require("express");

var app = express();

var contacts = [{
    name:"Thembani"
},{
    name:"Thembani2"
},{
    name:"Thembani3"
}];

app.get("/contacts", function(req, res){
   res.status(200).json(contacts);
});

app.listen(9001);