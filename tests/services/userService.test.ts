import { createUserRepositoryMock } from "../testUtils";
import { UserService } from "../../services/userService";
import { UserRepository } from "../../repositories/userRepository";

describe("UseService", () => {
    let mockRepository: UserRepository;
    let testUserService: UserService;

    beforeAll(() => {
        // setting up mocks for persistent storage.
        mockRepository = createUserRepositoryMock();
        testUserService = new UserService(mockRepository);
    });

    describe("loginDepartment", () => {

        it("should throw error when admin doesn't exist.", async function () {
            await expect(
                testUserService.loginDepartment("WRONG_USERNAME", "WRONG_PASS")
            ).rejects.toThrow(UserService.USER_NOT_EXISTS_ERROR);
        });

        it("should login admin given correct username and password.", async function() {
            await expect(
                testUserService.loginDepartment("TEST_USER", "TEST_PASS")
            ).resolves.not.toThrow(UserService.USER_NOT_EXISTS_ERROR);

            await expect(
                testUserService.loginDepartment("TEST_USER", "TEST_PASS")
            ).resolves.not.toThrow(UserService.PASSWORD_ERROR);
        });

        it("should throw error when password is wrong", async function () {
            await expect(
                testUserService.loginDepartment("TEST_USER", "TEST_WRONG")
            ).rejects.toThrow(UserService.PASSWORD_ERROR);
        });

    });

    describe("loginStudent", () => {

        it("should throw error when student doesn't exist.", async function () {
            await expect(
                testUserService.loginStudent("WRONG_USERNAME", "WRONG_PASS")
            ).rejects.toThrow(UserService.USER_NOT_EXISTS_ERROR);
        });

        it("should login student given correct username and password.", async function() {
            await expect(
                testUserService.loginStudent("TEST_REG", "TEST_PASS")
            ).resolves.not.toThrow(UserService.USER_NOT_EXISTS_ERROR);

            await expect(
                testUserService.loginStudent("TEST_REG", "TEST_PASS")
            ).resolves.not.toThrow(UserService.PASSWORD_ERROR);
        });

        it("should throw error when password is wrong", async function () {
            await expect(
                testUserService.loginStudent("TEST_REG", "TEST_WRONG")
            ).rejects.toThrow(UserService.PASSWORD_ERROR);
        });

    });

});
