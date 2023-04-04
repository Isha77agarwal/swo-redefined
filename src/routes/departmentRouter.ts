import express from "express";
import { isAdminLoggedIn } from "../middleware/authMiddleware";
import { userService } from "../services/userService";
import appConfig from "../appConfig";

const router = express.Router();

/**
 * renders department dashboard with information about the logged in department
 * if no department is logged in, it will redirect the user back to login page.
 */
router.get("/", isAdminLoggedIn, async (req, res) => {
    const admin_id = req.session.admin?.id;

    if (admin_id === undefined) {
        // error department must be logged in
        // reason for 500 status - this check should be performed by
        // isAdminLoggedIn middleware and this piece of code is theoretically
        // impossible to run.
        res.status(500).send("Admin ID not found in session.");
        return;
    }

    await userService.getAdminDetails(admin_id);

    res.render("pages/department");
});

/**
 * renders mtech fellowship page to fill fresh and pending fellowship for the department
 * if no department is logged in, it will redirect the user back to login page.
 */
router.get("/mtech-fellowship/", isAdminLoggedIn, async (req, res) => {
    const admin_id = req.session.admin?.id;
    const dept_id = req.session.department?.id;
    if (admin_id === undefined) {
        // error department must be logged in
        // reason for 500 status - this check should be performed by
        // isAdminLoggedIn middleware and this piece of code is theoretically
        // impossible to run.
        res.status(500).send("Admin ID not found in session.");
    }
    if (dept_id === undefined) {
        // the admin is not associated with any department.
        res.render("pages/mtech_fellowship", {
            error: {
                message: "NOT ALLOWED",
                code: 405,
            },
        });
        return;
    }
    const branches =
        await appConfig.DepartmentService.getAllBranchesOfDepartment(dept_id);

    res.render("pages/mtech_fellowship", {
        data: {
            branches: branches,
        }
    });
});

export default router;
