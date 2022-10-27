import express, {Express} from "express";
import dotenv from "dotenv";

dotenv.config();

const app:Express = express()
const port = process.env.PORT;

app.set("view engine", "jade");

app.listen(port, () => {
    console.log(`[SUCCESS] Server is running on http://localhost:${port}`);
});