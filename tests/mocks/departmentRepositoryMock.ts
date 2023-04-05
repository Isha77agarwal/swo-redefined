import { DepartmentRepository } from "../../src/repositories/departmentRepository";

export default function createDepartmentRepository(): DepartmentRepository {
    return {
        getDepartmentBranchesByID: (department_id) => {
            if(department_id === "TEST_DEPT") {
                return Promise.resolve([
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
            }
            return Promise.resolve([]);
        },
    };
}