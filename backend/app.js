const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
const productRouter = require("./routes/productRoutes");
app.use("/api/v1", productRouter);
const userRouter = require("./routes/userRoute");
app.use("/api/v1", userRouter);
const orderRouter = require("./routes/orderRoutes");
app.use("/api/v1", orderRouter);
const paymentRouter = require("./routes/paymentRoutes");
app.use("/api/v1", paymentRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// app.get("/", (req, res) => {
//   res.send("App is running");
// });

// Error Middle Ware
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);
module.exports = app;
