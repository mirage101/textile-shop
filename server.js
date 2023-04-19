import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import infopagesRoutes from "./routes/infopagesRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import slideRoutes from "./routes/slideRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import tickerRoutes from "./routes/tickerRoutes.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from "url";

//config env
dotenv.config();

//database config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/infopages", infopagesRoutes);
app.use("/api/v1/banners", bannerRoutes);
app.use("/api/v1/slider", slideRoutes);
app.use("/api/v1/shipping", shippingRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/modules", tickerRoutes);
//rest api
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to textile shop",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
