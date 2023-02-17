import { AdminRepository, adminRepository} from "../repositories/adminRepository";
import { StudentRepository, studentRepository} from "../repositories/studentRepository";
import crypto from "crypto";

export class AuthService {
    private adminRepository: AdminRepository;
    private studentRepository: StudentRepository;
    static readonly USER_NOT_EXISTS_ERROR = "User with provided username doesn't exist.";
    static readonly PASSWORD_ERROR = "Passwords are not same!";

    constructor(adminRepository: AdminRepository, studentRepository: StudentRepository) {
        this.adminRepository = adminRepository;
        this.studentRepository = studentRepository;
    }

    async loginDepartment(username: string, password: string): Promise<void> {
        const admin = await this.adminRepository.getAdminByUsername(username);
        if (admin === null) {
            throw new Error(AuthService.USER_NOT_EXISTS_ERROR);
        }
        await AuthService.verifyPassword(admin.password, password, admin.salt);
    }

    async loginStudent(registration: string, password: string): Promise<void> {
        const student = await this.studentRepository.getStudentByRegistration(registration);
        if (student === null) {
            throw new Error(AuthService.USER_NOT_EXISTS_ERROR);
        }
        else{
            let val = String(student.password);
            if(val != password)
            {
                throw new Error(AuthService.PASSWORD_ERROR);
            }

        }

        // await AuthService.verifyPassword(
        //     student.password,
        //     password,
        //     student.salt
        // );
    }

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

    // ONLY TO BE USED FOR TESTING
    static readonly getHashedPasswordForTesting = (
        password: string,
        salt: Buffer
    ) => {
        return AuthService.generateHashedPassword(password, salt);
    };

    protected static readonly generateHashedPassword = (
        password: string,
        salt: Buffer
    ) => {
        return crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256");
    };
}

export const userService: AuthService = new AuthService(adminRepository, studentRepository);
