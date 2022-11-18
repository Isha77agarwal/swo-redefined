import client from "../prisma/client";
import {Admin, Student} from "@prisma/client";

/**
 * UserRepository provides methods to retrieve Admin data from
 * persistent storage.
 */
export interface UserRepository {
    getAdminByUsername: (username: string) => Promise<Admin | null>;
    getStudentByUsername: (username: string) => Promise<Student | null>;
}

export const userRepository: UserRepository = {

    getAdminByUsername: (username: string) => {
        return client.admin.findUnique({
            where: {
                username: username,
            }
        });
    },

    getStudentByUsername: (username: string) => {
        return client.student.findUnique({
            where: {
                registration_no: username,
            }
        });
    }
};