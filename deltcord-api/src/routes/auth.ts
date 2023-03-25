import express from "express";
import {
    handleLogin,
    handleSignup,
    handleRefreshToken,
} from "../controllers/AuthController";

const router = express.Router();
router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/refresh", handleRefreshToken);

export default router;
