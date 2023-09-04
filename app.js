const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const path = require("path");

const globalErrorHandler = require("./Controllers/error");
const productRoutes = require("./Routes/product");
const userRoutes = require("./Routes/user");
const orderRoutes = require("./Routes/order");
const reviewRoutes = require("./Routes/review");
const cartRoutes = require("./Routes/cart");

const AppError = require("./Utils/appError");

// 1.) GLOBAL MIDDLEWARES

// CORS HEADERS
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Increase payload size limit to 10MB
app.use(express.json({ limit: "10mb" }));

// Limit requests from same IP

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

// Body Parser, reading data from body into req.body
app.use(bodyParser.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());
// 2) ROUTES

// Serve uploaded images from a specific directory
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carts", cartRoutes);
// app.use("/api/cartItems", cartItemRoutes);
app.use("/api", reviewRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
