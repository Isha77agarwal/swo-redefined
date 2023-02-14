import express from "express";
import { isDeptLoggedIn } from "../middleware/authMiddleware";
import mtechFellowshipService from "../services/mtechFellowshipService";

const fellowshipRouter = express.Router();

// department must be logged in to use the methods in this router
fellowshipRouter.use(isDeptLoggedIn);

/**
 * gets fresh fellowship by session, year, month of the logged in
 * department
 */
fellowshipRouter.get("/fresh/:session/:year/:month/", async (req, res) => {
    const dept_id = req.session.department?.id;
    const month = req.params.month as Month;
    const year = parseInt(req.params.year);
    const session = req.params.session;

    if (dept_id === undefined) {
        // error department must be logged in
        res.status(500).send("Department ID not found in session.");
        return;
    }

    const fellowships = await mtechFellowshipService.getFreshMTechFellowship(
        dept_id,
        month,
        year,
        session
    );

    res.send(fellowships);
});

export default fellowshipRouter;
