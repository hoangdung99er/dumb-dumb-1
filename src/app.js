const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/error");
const NotFoundError = require("./errors/notFoundError");
const isDev = process.env.NODE_ENV !== "production";

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a"
  }
);

app.use(
  isDev ? morgan("dev") : morgan("combined", { stream: accessLogStream })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

app.all("*", async (req, res, next) => {
  return next(new NotFoundError());
});

app.use(errorMiddleware);

module.exports = app;
