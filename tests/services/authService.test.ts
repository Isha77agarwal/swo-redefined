import { AuthService } from "../../src/services/authService";
import { AdminRepository } from "../../src/repositories/adminRepository";
import { StudentRepository } from "../../src/repositories/studentRepository";
import createAdminRepositoryMock from "../mocks/adminRepositoryMock";
import createStudentRepositoryMock from "../mocks/studentRepositoryMock";
import { Admin, Department } from "@prisma/client";

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

    describe("loginDepartmentAdmin", () => {
        it("should throw error when admin doesn't exist.", async function () {
            await expect(
                testUserService.loginDepartmentAdmin(
                    "WRONG_USERNAME",
                    "WRONG_PASS"
                )
            ).rejects.toThrow(AuthService.USER_NOT_EXISTS_ERROR);
        });

        it("should login admin given correct username and password.", async function () {
            await expect(
                testUserService.loginDepartmentAdmin("TEST_USER", "TEST_PASS")
            ).resolves.not.toThrow(AuthService.USER_NOT_EXISTS_ERROR);

            await expect(
                testUserService.loginDepartmentAdmin("TEST_USER", "TEST_PASS")
            ).resolves.not.toThrow(AuthService.PASSWORD_ERROR);
        });

        it("should throw error when password is wrong", async function () {
            await expect(
                testUserService.loginDepartmentAdmin("TEST_USER", "TEST_WRONG")
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

    describe("createAdmin", () => {
        let createAdminWithDepartmentSpy: jest.SpyInstance<
                Promise<Department>,
                [adminDetails: CreateAdminQueryParams, department: string]
            >,
            createAdminSpy: jest.SpyInstance<
                Promise<Admin>,
                [adminDetails: CreateAdminQueryParams]
            >;

        beforeEach(() => {
            if(createAdminSpy !== undefined) {
                createAdminWithDepartmentSpy.mockReset();
                createAdminSpy.mockReset();
            }
            createAdminWithDepartmentSpy = jest.spyOn(
                mockAdminRepository,
                "createDepartmentAdmin"
            );
            createAdminSpy = jest.spyOn(mockAdminRepository, "createAdmin");
        });

        it("should successfully create admin for a particular department", async function () {
            await expect(
                testUserService.createAdmin({
                    username: "TEST_ADMIN",
                    password: "TEST_PASSWORD",
                    department_id: "TEST_DEPT",
                    name: "TEST_NAME",
                    email: "TEST_EMAIL",
                    mobile: "TEST_MOBILE",
                })
            ).resolves.not.toThrow();
            expect(createAdminWithDepartmentSpy).toHaveBeenCalled();
            expect(createAdminSpy).not.toHaveBeenCalled();
        });

        it("should successfully create generic admin when department is not passed.", async function () {
            await expect(testUserService.createAdmin({
                username: "TEST_ADMIN",
                password: "TEST_PASSWORD",
                name: "TEST_NAME",
                email: "TEST_EMAIL",
                mobile: "TEST_MOBILE",
            })).resolves.not.toThrow();
            expect(createAdminSpy).toHaveBeenCalled();
            expect(createAdminWithDepartmentSpy).not.toHaveBeenCalled();
        });
    });
});
