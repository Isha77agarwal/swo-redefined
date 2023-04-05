import express from "express";
import { userService } from "../services/userService";

const router = express.Router();

router.get("/", async (req, res) => {
    await userService.getAdminDetails("test_admin");
    res.render("pages/index");
});

export default router;
