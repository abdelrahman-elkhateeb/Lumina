const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const userRouter = require("./routes/userRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

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

// Handle undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Start server
module.exports = app;
