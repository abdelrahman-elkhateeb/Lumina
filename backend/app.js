const express = require("express");
const userRouter = require("./routes/userRoute")
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

//4)START SERVER
module.exports = app;
