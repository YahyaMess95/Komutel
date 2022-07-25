var express = require('express');
var app = express();
app.use(express.static("public"));

  
  app.listen(4000, function () {
    console.log("Application de test écoutant sur le port 4000 !");
  });

  app.set('view engine', 'ejs');
  app.set("views", "./views");

  
  app.get("/userage",function(req,res){
    res.render("Test1");
  })