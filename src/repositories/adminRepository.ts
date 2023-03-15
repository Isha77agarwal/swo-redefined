import client from "../prisma/client";
import { Admin, Department } from "@prisma/client";

/**
 * AdminRepository provides methods to retrieve Admin data from
 * persistent storage.
 */
export interface AdminRepository {
    getAdminByUsername: (username: string) => Promise<Admin | null>;
    createAdmin: (
        adminDetails: CreateAdminQueryParams
    ) => Promise<Admin | never>;

    createDepartmentAdmin: (
        adminDetails: CreateAdminQueryParams,
        department: string
    ) => Promise<Department | never>;
}

export const adminRepository: AdminRepository = {
    getAdminByUsername: (username: string) => {
        return client.admin.findUnique({
            where: {
                username: username,
            },
        });
    },

    createAdmin: (adminDetails: CreateAdminQueryParams) => {
        return client.admin.create({
            data: {
                username: adminDetails.username,
                password: adminDetails.password,
                name: adminDetails.name,
                email: adminDetails.email,
                is_super_admin: adminDetails.is_super_admin,
                mobile: adminDetails.mobile,
                salt: adminDetails.salt,
            },
        });
    },

    createDepartmentAdmin: (
        adminDetails: CreateAdminQueryParams,
        department: string
    ) => {
        return client.department.update({
            where: {
                id: department,
            },
            data: {
                hod: {
                    create: {
                        username: adminDetails.username,
                        password: adminDetails.password,
                        name: adminDetails.name,
                        email: adminDetails.email,
                        is_super_admin: adminDetails.is_super_admin,
                        mobile: adminDetails.mobile,
                        salt: adminDetails.salt,
                    },
                },
            },
        });
    },
};
