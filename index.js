const express = require("express");
const bodyParser = require("body-parser");
const bookRouter = require("./src/controller/book.controller");

require("express-async-handler");

const app = express();
const port = process.env.PORT || 5000;

// moddleware
app.use(bodyParser.json());
app.use("/api/book", bookRouter);

app.use((error, req, res, next) => {
  if (error) {
    console.log(error);
    res.status(error.status || 500).send({
      message: "Something went wrong",
    });
  }
});
// listen
app.listen(port, () => console.log("Server started at " + port));
