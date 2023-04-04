import express, { Express } from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import winston from "winston";
import expressWinston from "express-winston";

import rootRouter from "./routes/rootRouter";
import userRouter from "./routes/userRouter";
import departmentRouter from "./routes/departmentRouter";
import path from "path";

// put .env file variables in process.env
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const sessionSecret = process.env.SESSION_SECRET;
const environment = process.env.ENVIRONMENT;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/ui"));

// setting up middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(
    session({
        secret: sessionSecret ?? "sessionSecret",
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // one day
        },
        resave: false,
    })
);
// setting up static files
app.use(express.static(__dirname + "/ui"));
app.use(express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));
app.use("/bootstrap", express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));
app.use("/src/ui/media", express.static(__dirname + "/ui/media"));
app.use("/src/ui/styles", express.static(__dirname + "/ui/styles"));

if(environment === "DEVELOPMENT" || environment === "TEST") {
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: false,
    }));
}
app.use(expressWinston.errorLogger({
    transports: [
        environment === "PRODUCTION" ? new winston.transports.File({
            filename: "prod_error_logs.log"
        }) :  new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

// setting up routers
app.use("/", rootRouter);
app.use("/users/", userRouter);
app.use("/department/", departmentRouter);

app.listen(port, () => {
  console.log(`[SUCCESS] Server is running on http://localhost:${port}`);
});
