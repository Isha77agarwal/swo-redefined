import {
    AdminRepository,
    adminRepository,
} from "../repositories/adminRepository";
import {
    StudentRepository,
    studentRepository,
} from "../repositories/studentRepository";
import crypto from "crypto";

export class AuthService {
    static readonly USER_NOT_EXISTS_ERROR =
        "User with provided username doesn't exist.";
    static readonly PASSWORD_ERROR = "Passwords are not same!";
    private adminRepository: AdminRepository;
    private studentRepository: StudentRepository;

    constructor(
        adminRepository: AdminRepository,
        studentRepository: StudentRepository
    ) {
        this.adminRepository = adminRepository;
        this.studentRepository = studentRepository;
    }

    // ONLY TO BE USED FOR TESTING
    static readonly getHashedPasswordForTesting = (
        password: string,
        salt: Buffer
    ) => {
        return AuthService.generateHashedPassword(password, salt);
    };

    protected static readonly verifyPassword = async (
        actual: Buffer,
        provided: string,
        salt: Buffer
    ) => {
        const hashedProvidedPassword = await AuthService.generateHashedPassword(
            provided,
            salt
        );
        if (!crypto.timingSafeEqual(actual, hashedProvidedPassword))
            throw new Error(AuthService.PASSWORD_ERROR);
    };

    protected static readonly generateHashedPassword = (
        password: string,
        salt: Buffer
    ) => {
        return crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256");
    };

    async loginDepartmentAdmin(
        username: string,
        password: string
    ): Promise<void> {
        const admin = await this.adminRepository.getAdminByUsername(username);
        if (admin === null) {
            throw new Error(AuthService.USER_NOT_EXISTS_ERROR);
        }
        await AuthService.verifyPassword(admin.password, password, admin.salt);
    }

    async createAdmin(adminDetail: CreateAdminParams): Promise<void> {
        const salt = this.getUniqueSalt();
        const hashedPassword = AuthService.generateHashedPassword(
            adminDetail.password,
            salt
        );
        if (adminDetail.department_id === undefined) {
            await this.adminRepository.createAdmin({
                username: adminDetail.username,
                password: hashedPassword,
                name: adminDetail.name,
                email: adminDetail.email,
                mobile: adminDetail.mobile,
                salt: salt,
                is_super_admin: adminDetail.is_super_admin ?? false,
            });
        } else {
            await this.adminRepository.createDepartmentAdmin(
                {
                    username: adminDetail.username,
                    password: hashedPassword,
                    name: adminDetail.name,
                    email: adminDetail.email,
                    mobile: adminDetail.mobile,
                    salt: salt,
                    is_super_admin: adminDetail.is_super_admin ?? false,
                },
                adminDetail.department_id
            );
        }
    }

    async loginStudent(registration: string, password: string): Promise<void> {
        const student = await this.studentRepository.getStudentByRegistration(
            registration
        );
        if (student === null) {
            throw new Error(AuthService.USER_NOT_EXISTS_ERROR);
        }
        await AuthService.verifyPassword(
            student.password,
            password,
            student.salt
        );
    }

    protected readonly getUniqueSalt = (): Buffer => {
        return crypto.randomBytes(32);
    };
}

export const authService: AuthService = new AuthService(
    adminRepository,
    studentRepository
);
