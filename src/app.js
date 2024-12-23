const express = require("express");
const routes = require("./routes/index");


const app = express();


app.use(express.json()); // For parsing JSON bodies


// Routes
app.use("/", routes);


module.exports = app;


