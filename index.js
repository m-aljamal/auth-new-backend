const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const errorHandler = require("./middlewares/error-handler");
require("express-async-errors");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });
mongoose.set("useCreateIndex", true);

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);
app.use(errorHandler);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("app start at", port);
});
