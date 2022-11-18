import { UserRepository, userRepository} from "../repositories/userRepository";
import crypto from "crypto";

export class UserService {
    private repository: UserRepository;
    static readonly USER_NOT_EXISTS_ERROR = "User with provided username doesn't exist.";
    static readonly PASSWORD_ERROR = "Passwords are not same!";

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async loginDepartment(username: string, password: string): Promise<void> {
        const admin = await this.repository.getAdminByUsername(username);
        if (admin === null) {
            throw new Error(UserService.USER_NOT_EXISTS_ERROR);
        }
        await UserService.verifyPassword(admin.password, password, admin.salt);
    }

    async loginStudent(username: string, password: string): Promise<void> {
        const student = await this.repository.getStudentByUsername(username);
        if (student === null) {
            throw new Error(UserService.USER_NOT_EXISTS_ERROR);
        }
        await UserService.verifyPassword(
            student.password,
            password,
            student.salt
        );
    }

    protected static readonly verifyPassword = async (
        actual: Buffer,
        provided: string,
        salt: Buffer
    ) => {
        const hashedProvidedPassword = await UserService.generateHashedPassword(
            provided,
            salt
        );
        if (!crypto.timingSafeEqual(actual, hashedProvidedPassword))
            throw new Error(UserService.PASSWORD_ERROR);
    };

    // ONLY TO BE USED FOR TESTING
    static readonly getHashedPasswordForTesting = (
        password: string,
        salt: Buffer
    ) => {
        return UserService.generateHashedPassword(password, salt);
    };

    protected static readonly generateHashedPassword = (
        password: string,
        salt: Buffer
    ) => {
        return crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256");
    };
}

export const userService: UserService = new UserService(userRepository);
