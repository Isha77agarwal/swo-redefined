import express, { Express } from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import {router as departmentRouter} from "./rest/department/router";

// put .env file variables in process.env
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const sessionSecret = process.env.SESSION_SECRET;

app.set("view engine", "jade");

// setting up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // one day
    },
    resave: false,
  })
);

// setting up routers
app.use("/department", departmentRouter);

app.listen(port, () => {
  console.log(`[SUCCESS] Server is running on http://localhost:${port}`);
});
