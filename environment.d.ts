declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DATABASE_URL: string;
            SESSION_SECRET: string;
            ENVIRONMENT: "TEST" | "DEVELOPMENT" | "PRODUCTION";
        }
    }
}

declare module "express-session" {
    interface SessionData {
        department: Department
    }
}

export {};