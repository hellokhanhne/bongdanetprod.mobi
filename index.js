const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const router = require("./routers");
const lichdidau = require("./routers/lichthidau");
const livecore = require("./routers/livecore");

const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.use("/", router);
app.use("/livescore", livecore);
app.use("/lich-thi-dau-bong-da", lichdidau);

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(80);
