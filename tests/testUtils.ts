import { UserRepository } from "../repositories/userRepository";
import { Admin, Student } from "@prisma/client";
import { UserService } from "../services/userService";

export function createUserRepositoryMock(): UserRepository {
    return {
        getAdminByUsername(username: string): Promise<Admin | null> {
            const salt = Buffer.from("TEST_SALT");
            const password = UserService.getHashedPasswordForTesting("TEST_PASS", salt);

            const admin: Admin = {
                username: "TEST_USER",
                password: password,
                salt: salt,
                is_super_admin: false,
                email: "TEST_USER@email.com",
                mobile: "1234567890",
                name: "TEST_USER",
                token: null,
            };

            if (username === admin.username) {
                return Promise.resolve(admin);
            }
            return Promise.resolve(null);
        },

        getStudentByUsername(username: string): Promise<Student | null> {
            const salt = Buffer.from("TEST_SALT");
            const password = UserService.getHashedPasswordForTesting("TEST_PASS", salt);

            const student: Student = {
                registration_no: "TEST_REG",
                program_type: "BTech",
                semester: 0,
                password: password,
                salt: salt,
                presentation_date: null,
                JRF_start_date: null,
                JRF_end_date: null,
                SRF_start_date: null,
                SRF_end_date: null,
                session_id: "",
                branch_id: "",
                department_id: "",
            };

            if (username === student.registration_no) {
                return Promise.resolve(student);
            }

            return Promise.resolve(null);
        },
    };
}
