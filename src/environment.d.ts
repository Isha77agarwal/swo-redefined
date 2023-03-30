import {Prisma} from "@prisma/client";

// this file includes type declarations.
// if you want to add any new type add it here under
// global namespace.
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

    export type Result = {
        semester: number;
        passed: boolean;
    }

    // session information regarding department
    export type DepartmentSession = {
        id: string,
        name: string,
    };

    // session information regarding admin
    export type AdminSession = {
        id: string,
        name: string,
        email: string,
        mobile: string,
        is_super_admin: boolean,
    }

    export type MTechStipend = {
        start_date: Date;
        amount: number;
    }

    // studentRepository types
    export type StudentWithFreshMTechFellowshipDetail = Prisma.StudentGetPayload<{
        include: {
            Result: true,
            FellowshipBlock: true,
            MTechFellowship: true,
        },
    }>;
}

declare module "express-session" {
    export interface SessionData {
        department: DepartmentSession;
        admin: AdminSession;
    }
}

export {};
