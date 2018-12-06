import express from "express";
import path from "path";
import bodyParser from "body-parser";
import ejs from "ejs";

// import routes
import index from "./routes/index";
import api from "./routes/api";

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
app.use("/api", api);
app.use("/*", index);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
