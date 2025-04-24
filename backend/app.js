const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const userRouter = require("./src/users/userRoute");
const courseRouter = require("./src/course/courseRoute");
const paymentRouter = require("./src/payment/paymentRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./src/error/errorController");

const app = express();

// Enable CORS
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  },
));


// Parse incoming JSON requests
app.use(express.json());

// Route Handlers
app.use('/api/users', userRouter);

app.use("/api/courses", courseRouter);

app.use("/api/payment", paymentRouter)

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Start server
module.exports = app;
