import { DepartmentService } from "../../src/services/departmentService";
import createDepartmentRepository from "../mocks/departmentRepositoryMock";

describe("Department service tests", () => {
    let testDepartmentService: DepartmentService;

    beforeAll(() => {
        const mockDepartmentRepository = createDepartmentRepository();
        testDepartmentService = new DepartmentService(mockDepartmentRepository);
    });

    it("should return all branches of the department given department id.", async function () {
        const department_id = "TEST_DEPT";
        const branches = await testDepartmentService.getAllBranchesOfDepartment(
            department_id
        );
        expect(branches.length).toBeGreaterThan(0);
        expect(branches).toStrictEqual([
            {
                id: "TEST_BRANCH_1",
                name: "TEST_BRANCH_1",
                department_id: department_id,
            },
            {
                id: "TEST_BRANCH_2",
                name: "TEST_BRANCH_2",
                department_id: department_id,
            },
            {
                id: "TEST_BRANCH_3",
                name: "TEST_BRANCH_3",
                department_id: department_id,
            },
            {
                id: "TEST_BRANCH_4",
                name: "TEST_BRANCH_4",
                department_id: department_id,
            },
            {
                id: "TEST_BRANCH_5",
                name: "TEST_BRANCH_5",
                department_id: department_id,
            },
        ]);
    });
});
