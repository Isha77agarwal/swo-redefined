import client from "../prisma/client";
import { Student } from "@prisma/client";

/**
 * StudentRepository provides methods to retrieve Student data from
 * persistent storage.
 */
export interface StudentRepository {

    /**
     * returns unique student from Student table given registration number.
     * @param registration
     */
    getStudentByRegistration: (registration: string) => Promise<Student | null>;

    /**
     * returns student data along with data from MTechFellowship,
     * FellowshipBlock and Result tables.
     *
     * It filters data based on department_id, month, year, session_id and
     * branch_id and only considers those records who have an associated
     * AcademicInformation and FinancialInformation record.
     * @param department_id
     * @param month
     * @param year
     * @param session_id
     * @param branch_id
     */
    getMTechStudentsWithFellowshipByFilter: (
        department_id: string,
        month: Month,
        year: number,
        session_id: string,
        branch_id?: string,
    ) => Promise<StudentWithFreshMTechFellowshipDetail[]>;
}

// default implementation of StudentRepository
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
                    },
                }
            }
        });
    },
};