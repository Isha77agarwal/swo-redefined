import {RequestHandler} from "express";

/**
 * simple check to see if department is logged in. Redirection to root
 * if department is not logged in.
 * @param req request object
 * @param res response object
 * @param next next function
 */
export const isAdminLoggedIn: RequestHandler = (req, res, next) => {
    if(req.session.admin === undefined) {
        res.redirect("/");
        return;
    }
    next();
};