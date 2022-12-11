import express from "express";
import {AuthService, userService} from "../services/authService";

const router = express.Router();

/**
 * It allows for department and students to login based on the role path param passed.
 * takes username and password in the body of the request and authenticates the user.
 */
router.post("/login/:role", async (req, res) => {
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
            await userService.loginDepartment(username, password);
        } else {
            await userService.loginStudent(username, password);
        }
        res.status(200).send("Login successful.");
    } catch (err) {
        console.log(err);
        switch ((err as Error).message) {
            case AuthService.USER_NOT_EXISTS_ERROR:
                res.status(401).send("User doesn't exist!");
                break;
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