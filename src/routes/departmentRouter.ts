import express from "express";
import { isAdminLoggedIn } from "../middleware/authMiddleware";
import { userService } from "../services/userService";

const router = express.Router();

/**
 * renders department dashboard with information about the logged in department
 * if no department is logged in, it will redirect the user back to login page.
 */
router.get("/", isAdminLoggedIn, async (req, res) => {
    const admin_id = req.session.admin?.id;

    if(admin_id === undefined) {
        // error department must be logged in
        // reason for 500 status - this check should be performed by
        // isAdminLoggedIn middleware and this piece of code is theoretically
        // impossible to run.
        res.status(500).send("Department ID not found in session.");
        return;
    }

    await userService.getAdminDetails(admin_id);

    res.render("pages/department");
});

export default router;