import {
    createAdminRepositoryMock,
    createStudentRepositoryMock,
} from "../testUtils";
import { AuthService } from "../../services/authService";
import { AdminRepository } from "../../repositories/adminRepository";
import { StudentRepository } from "../../repositories/studentRepository";

describe("UserService", () => {
    let mockAdminRepository: AdminRepository;
    let mockStudentRepository: StudentRepository;
    let testUserService: AuthService;

    beforeAll(() => {
        // setting up mocks for persistent storage.
        mockAdminRepository = createAdminRepositoryMock();
        mockStudentRepository = createStudentRepositoryMock();
        testUserService = new AuthService(
            mockAdminRepository,
            mockStudentRepository
        );
    });

    describe("loginDepartment", () => {
        it("should throw error when admin doesn't exist.", async function () {
            await expect(
                testUserService.loginDepartment("WRONG_USERNAME", "WRONG_PASS")
            ).rejects.toThrow(AuthService.USER_NOT_EXISTS_ERROR);
        });

        it("should login admin given correct username and password.", async function () {
            await expect(
                testUserService.loginDepartment("TEST_USER", "TEST_PASS")
            ).resolves.not.toThrow(AuthService.USER_NOT_EXISTS_ERROR);

            await expect(
                testUserService.loginDepartment("TEST_USER", "TEST_PASS")
            ).resolves.not.toThrow(AuthService.PASSWORD_ERROR);
        });

        it("should throw error when password is wrong", async function () {
            await expect(
                testUserService.loginDepartment("TEST_USER", "TEST_WRONG")
            ).rejects.toThrow(AuthService.PASSWORD_ERROR);
        });
    });

    describe("loginStudent", () => {
        it("should throw error when student doesn't exist.", async function () {
            await expect(
                testUserService.loginStudent("WRONG_USERNAME", "WRONG_PASS")
            ).rejects.toThrow(AuthService.USER_NOT_EXISTS_ERROR);
        });

        it("should login student given correct username and password.", async function () {
            await expect(
                testUserService.loginStudent("TEST_REG", "TEST_PASS")
            ).resolves.not.toThrow(AuthService.USER_NOT_EXISTS_ERROR);

            await expect(
                testUserService.loginStudent("TEST_REG", "TEST_PASS")
            ).resolves.not.toThrow(AuthService.PASSWORD_ERROR);
        });

        it("should throw error when password is wrong", async function () {
            await expect(
                testUserService.loginStudent("TEST_REG", "TEST_WRONG")
            ).rejects.toThrow(AuthService.PASSWORD_ERROR);
        });
    });
});
