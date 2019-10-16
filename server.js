const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require("path");
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("*", function(req,res) {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(PORT, function() {
    console.log("App listening in on " + PORT);
});