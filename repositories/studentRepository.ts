import client from "../prisma/client";
import {Student} from "@prisma/client";

/**
 * StudentRepository provides methods to retrieve Student data from
 * persistent storage.
 */
export interface StudentRepository {
    getStudentByRegistration: (registration: string) => Promise<Student | null>;
}

export const studentRepository: StudentRepository = {

    getStudentByRegistration: (registration: string) => {
        return client.student.findUnique({
            where: {
                registration_no: registration,
            }
        });
    }
};