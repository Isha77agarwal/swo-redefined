import client from "../prisma/client";
import {Admin} from "@prisma/client";

/**
 * AdminRepository provides methods to retrieve Admin data from
 * persistent storage.
 */
export interface AdminRepository {
    getAdminByUsername: (username: string) => Promise<Admin | null>;
}

export const adminRepository: AdminRepository = {

    getAdminByUsername: (username: string) => {
        return client.admin.findUnique({
            where: {
                username: username,
            }
        });
    }
};