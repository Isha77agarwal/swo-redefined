import {AdminRepository} from "../../src/repositories/adminRepository";
import {Admin} from "@prisma/client";
import {AuthService} from "../../src/services/authService";

export default function createAdminRepositoryMock(): AdminRepository {
    return {
        getAdminByUsername(username: string): Promise<Admin | null> {
            const salt = Buffer.from("TEST_SALT");
            const password = AuthService.getHashedPasswordForTesting("TEST_PASS", salt);

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

        createAdmin(adminDetail) {
            return Promise.resolve({
                username: adminDetail.username,
                password: adminDetail.password,
                name: adminDetail.name,
                email: adminDetail.email,
                mobile: adminDetail.mobile,
                salt: adminDetail.salt,
                is_super_admin: adminDetail.is_super_admin,
                token: null,
            });
        },

        createDepartmentAdmin(adminDetail, department) {
            return Promise.resolve({
                id: department,
                name: "TEST_DEPT",
                hod_id: adminDetail.username,
            });
        }
    };
}