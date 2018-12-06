const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// import routes
const index = require("./routes/index");
const api = require("./routes/api");

// port
const port = 4000;

// init app
const app = express();
app.set("json spaces", 2);

// view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);

// set static path
app.use(express.static(path.join(__dirname, "client")));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up routes
app.use("/api", api.router);
app.use("/*", index.router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
