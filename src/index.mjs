import express from "express";
import userRouter from "./Routes/users/users.mjs";
import shopRouter from "./Routes/shop/shop.mjs";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRouter from "./Routes/products/products.mjs";
import ordersRouter from "./Routes/orders/orders.mjs";
import dealRouter from "./Routes/deals/deals.mjs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const mongodburi = process.env.MONGODB_CONNECTION_STRING;

// Refined CORS configuration
app.use(
  cors({
    origin:[ 'https://multivendorecommerce-00.web.app','https://52.70.243.175/', 'http://localhost:5173', 'https://multi-vendor-e-commrce-system-frontend-54qv.vercel.app'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);

mongoose
  .connect("mongodb+srv://abdul:127102Tr@multivendorecommerce.ysfgkez.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=MultiVendorECommerce")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

app.use(
  session({
    secret: "Cjay",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000000 * 60,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);
app.use(cookieParser("myCookie"));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(shopRouter);
app.use(userRouter);
app.use(productRouter);
app.use(ordersRouter);
app.use(dealRouter);

app.get('/',(request,response)=>{
  response.json("Running")
})
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});


