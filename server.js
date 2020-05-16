// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
//var index = require("index");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

app.use(express.static('public'));

var textArray = [];

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));

});

// Posts data
app.post("/api/notes", function (req, res) {
    var newdata = req.body;
    textArray.push(newdata);
    console.log("Inside Post" + JSON.stringify(textArray));
    fs.appendFile("./db/db.json", JSON.stringify(textArray), function (err) {
        if (err) {
            throw err;
        }
        res.end();
    });

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});