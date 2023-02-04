declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            PORT: number;
            DATABASE_URL: string;
            SESSION_SECRET: string;
            ENVIRONMENT: "TEST" | "DEVELOPMENT" | "PRODUCTION";
        }
    }

    export type Month =
        | "January"
        | "February"
        | "March"
        | "April"
        | "May"
        | "June"
        | "July"
        | "August"
        | "September"
        | "October"
        | "November"
        | "December";

    export type ProgramType = "BTech" | "MTech" | "PhD";
}

declare module "express-session" {
    export interface SessionData {
        department: Department;
    }
}

export {};
