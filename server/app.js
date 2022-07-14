const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cronJob = require("./cron/fetchNews");

const indexRouter = require("./routes/index");

const DBConnection = require("./database");

var app = express();

DBConnection();
cronJob();
app.use(logger("dev"));

//index route
app.use("/api", indexRouter);

// Error handling for invalid routes
app.use(function(req, res, next) {
  next(createError(404, "Page Not Found"));
});

// error handler
app.use(function(err, req, res, next) { 
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});


module.exports = app;
