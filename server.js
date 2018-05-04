const express = require('express');
const app = express();
var path = require("path");

// Serve all files in dist
app.use(express.static(__dirname+"/dist"));

// Show the index file
app.get('/', (req,res)=> res.sendFile('/index.html'));

// Start listening on port 9245
app.listen(80, () => console.log("App listening on port 9245!"));