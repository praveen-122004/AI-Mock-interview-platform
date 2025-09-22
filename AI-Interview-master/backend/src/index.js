import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { connectDB } from "./libs/db.js";
import authRoutes from "./routes/auth.route.js";
import interviewRoutes from "./routes/interview.route.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import contactRoutes from "./routes/contact.route.js";

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

// 🟢 IMPORTANT CORS config
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ai-mock-frontend.onrender.com"
    ],
    credentials: true
  })
);

// 🟢 IMPORTANT Session config
app.use(
  session({
    secret: "your_secret_here",   // you can make this any long string
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://madhumylapalli123:kGLcrjfYk7CE1hH2@cluster0.fjm73ac.mongodb.net/interviewdb?retryWrites=true&w=majority",
      collectionName: "sessions"
    }),
    cookie: {
      httpOnly: true,
      secure: true,        // Important for Render HTTPS
      sameSite: "none"     // Important for cross-site cookies
    }
  })
);

// Routes
app.use("/aiinterview/auth", authRoutes);
app.use("/aiinterview/interview", interviewRoutes);
app.use("/aiinterview/user", userRoutes);
app.use("/aiinterview/admin", adminRoutes);
app.use("/aiinterview/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
