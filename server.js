const express = require("express");

const app = express();
const db = require("./db");
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoute");

app.get("/", function (req, res) {
  res.send("hello from home");
});

app.use("/person", personRoutes);
app.use("/menuItem", menuRoutes);

app.listen(port, () => {
  console.log("server running");
});
