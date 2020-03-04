const express = require("express");
const bodyparser = require("body-parser");

let app = express();

// database
let database = [];
let id = 100;
app.use(express.static("public"));
app.use(bodyparser.json());
app.get("/api/shopping", function(req,res){
    res.status(200).json(database);
})

app.post("/api/shopping", function(req,res){
    let item = {
        id: id,
        type: req.body.type,
        price: req.body.price,
        count: req.body.count
    }
    id++
    
    database.push(item);
    res.status(200).json({message:"Success"});
    
})

app.listen(3000);

console.log("Running in port 3000!");