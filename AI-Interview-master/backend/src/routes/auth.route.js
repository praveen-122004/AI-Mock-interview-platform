import express from "express";
import { signup, login, checkAuth, logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Add this test route for deployment check
router.get("/test", (req, res) => {
  res.status(200).json({ message: "✅ Backend Auth Route Working" });
});

router.post("/signup", signup);  
router.post("/login", login);    
router.get("/check-auth", protectRoute, checkAuth); 
router.post("/logout", logout);  

export default router;
