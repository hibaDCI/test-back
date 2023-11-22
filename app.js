// import stuff you need
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import usersRouter from "./routers/usersRouter.js";
import recordsRouter from "./routers/recordsRouter.js";
import ordersRouter from "./routers/ordersRouter.js";
// creating express server

const app = express();
// middleware
// middleware to parse any incoming json data
app.use(express.json());

// connect to MongoDB through mongoose
try {
  await mongoose.connect("mongodb://127.0.0.1:27017/testMongodb");
  console.log("connection established successfully!😉");
} catch (err) {
  console.log(err);
}
// mongoose
//   .connect(`mongodb://${process.env.DB}/recordShop`)
//   .then(() => console.log("We connected to DB "))
//   .catch((err) => console.log(err));

// middleware morgan
app.use(morgan("tiny"));

// cors middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://test-frontend-cta4.onrender.com",
    ],
    exposedHeaders: ["token"],
  })
);
// the routers (like middleware , to handle the request and send them to specific route )
// localhost:8000/api/users
app.use("/api/users", usersRouter);
// localhost:8000/api/records
app.use("/api/records", recordsRouter);
// localhost:8000/api/orders
app.use("/api/orders", ordersRouter);

// middleware to handle errors

app.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message || "something went wrong");
});

// the server should listen on port 8000

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("the server is running on port 🎉", PORT);
});
/* 
"scripts": {
    "dev": "set NODE_ENV=development && nodemon app.js",
    "start": "set NODE_ENV=production && node app.js"
  }, */
