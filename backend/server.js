import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"; 
import messageRoutes from "./routes/message.routes.js"; 
import userRoutes from "./routes/user.routes.js";


import cookieParser from "cookie-parser";



import connectDB from "./db/connect.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





// app.get("/", (req, res) => {
//   res.send("Hello World!!!");
// });

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

app.use("/api/users", userRoutes); 
app.use(errorHandler);




app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});