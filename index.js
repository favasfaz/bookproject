import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParcer from "cookie-parser";
import db from "./util/config.js";
import bookRouter from "./routes/BooksRoutes.js";
import userRouter from "./routes/UserRouter.js";
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();
const PORT = process.env.PORT || 3002;
const app = express();
db();
app.use(cookieParcer());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//api
app.use("/api/books", verifyToken, bookRouter);
app.use("/api/users", userRouter);
app.use('/',(req,res)=>{
  res.send('success')
})

//error middleware
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(500).json({
    success: false,
    status: errStatus,
    message: errorMessage,
  });
});

//port listen
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
