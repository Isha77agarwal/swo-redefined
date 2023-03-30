import { UserService } from "../../src/services/userService";
import { AdminRepository } from "../../src/repositories/adminRepository";
import createAdminRepositoryMock from "../mocks/adminRepositoryMock";

describe("UserService", () => {
    let testUserService: UserService;
    let mockAdminRepository: AdminRepository;

    beforeAll(() => {
        // setting up mocks for persistent storage.
        mockAdminRepository = createAdminRepositoryMock();
        testUserService = new UserService(mockAdminRepository);
    });

    describe("getAdminDetails", () => {
        it("should return the desired data for the department dashboard", async function() {
            const details = await testUserService.getAdminDetails("test_admin");
            expect(Object.keys(details)).toContain("department_id");
            expect(details["department_id"]).not.toBeUndefined();
            expect(Object.keys(details)).toContain("department_name");
            expect(details["department_name"]).not.toBeUndefined();
            expect(Object.keys(details)).toContain("hod_id");
            expect(details["hod_id"]).not.toBeUndefined();
            expect(Object.keys(details)).toContain("hod_name");
            expect(details["hod_name"]).not.toBeUndefined();
            expect(Object.keys(details)).toContain("hod_email");
            expect(details["hod_email"]).not.toBeUndefined();
            expect(Object.keys(details)).toContain("hod_mobile");
            expect(details["hod_mobile"]).not.toBeUndefined();
            expect(Object.keys(details)).toContain("hod_is_super_admin");
            expect(details["hod_is_super_admin"]).not.toBeUndefined();
        });

        it("should throw error when admin is not associated with any department", async function() {
            await expect(testUserService.getAdminDetails("wrong_admin")).rejects.toThrow();
        });
    });
});
