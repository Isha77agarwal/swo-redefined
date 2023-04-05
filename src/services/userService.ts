import {
    AdminRepository,
    adminRepository,
} from "../repositories/adminRepository";
import EntityDoesNotExist from "../errors/EntityDoesNotExist";

/**
 * Service class that is used to perform user actions like getting
 * user details.
 */
export class UserService {
    private adminRepository: AdminRepository;

    constructor(adminRepository: AdminRepository) {
        this.adminRepository = adminRepository;
    }

    async getAdminDetails(
        admin_id: string
    ): Promise<DepartmentDashboardDetails> {
        const department = await adminRepository.getDepartmentByAdminUsername(
            admin_id
        );
        if (department === undefined || department === null) {
            throw new EntityDoesNotExist(
                `Department not associated with admin with id ${admin_id} does not exist.`
            );
        }
        return {
            department_id: department.id,
            department_name: department.name,
            hod_id: department.hod_id,
            hod_name: department.hod.name,
            hod_email: department.hod.email,
            hod_mobile: department.hod.mobile,
            hod_is_super_admin: department.hod.is_super_admin,
        };
    }
}

export const userService: UserService = new UserService(adminRepository);
