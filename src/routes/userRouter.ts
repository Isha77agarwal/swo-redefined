import express from "express";
import {AuthService, authService} from "../services/authService";
import multer from "multer";
import { userService } from "../services/userService";

const router = express.Router();

/**
 * It allows for department and students to login based on the role path param passed.
 * takes username and password in the body of the request and authenticates the user.
 */
router.post("/login/:role", multer().none(), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.params.role;

    // check username and password are sent.
    if(username === undefined || password === undefined) {
        res.status(400).send("username and password field are required!");
        return;
    }

    // check if role is invalid.
    if(role !== "department" && role !== "student") {
        res.status(404);
        return;
    }

    try {
        if (role === "department") {
            await authService.loginDepartmentAdmin(username, password);
            const adminDetails = await userService.getAdminDetails(username);
            req.session.department = {
                id: adminDetails.department_id,
                name: adminDetails.department_name,
            };
            req.session.admin = {
                id: adminDetails.hod_id,
                name: adminDetails.hod_name,
                is_super_admin: adminDetails.hod_is_super_admin,
                email: adminDetails.hod_email,
                mobile: adminDetails.hod_mobile
            };
        } else {
            await authService.loginStudent(username, password);
        }
        res.status(200).send("Login successful.");
    } catch (err) {
        switch ((err as Error).message) {
            case AuthService.USER_NOT_EXISTS_ERROR:
            case AuthService.PASSWORD_ERROR:
                res.status(401).send("Username or password is wrong!");
                break;
            default:
                res.status(500).send("Unknown error occurred!");
        }
        return;
    }
});

/**
 * used to log out authenticated users.
 */
router.post("/logout", async (req, res) => {
    res.status(200).send("Logout successful.");
});

export default router;