import client from "../prisma/client";
import { Student } from "@prisma/client";

/**
 * StudentRepository provides methods to retrieve Student data from
 * persistent storage.
 */
export interface StudentRepository {
    getStudentByRegistration: (registration: string) => Promise<Student | null>;

    getMTechStudentsWithFellowshipByFilter: (
        department_id: string,
        month: Month,
        year: number,
        session_id: string,
        branch_id?: string,
    ) => Promise<Student[]>;
}

export const studentRepository: StudentRepository = {
    getStudentByRegistration: (registration: string) => {
        return client.student.findUnique({
            where: {
                registration_no: registration,
            },
        });
    },

    getMTechStudentsWithFellowshipByFilter: (
        department_id: string,
        month: Month,
        year: number,
        session_id: string,
        branch_id?: string
    ) => {
        return client.student.findMany({
            where: {
                department_id: department_id,
                program_type: "MTech",
                branch_id: branch_id,
                AcademicInformation: {
                    isNot: null
                },
                FinancialInformation: {
                    isNot: null
                }
            },
            include: {
                FellowshipBlock: true,
                Result: true,
                MTechFellowship: {
                    where: {
                        month: month,
                        session_id: session_id
                    }
                }
            },
        });
    },
};