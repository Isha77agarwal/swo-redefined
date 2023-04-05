import client from "../prisma/client";
import {Branch} from "@prisma/client";

export interface DepartmentRepository {
    getDepartmentBranchesByID: (department_id: string) => Promise<Branch[]>
}

const departmentRepository: DepartmentRepository = {
    getDepartmentBranchesByID: (department_id: string) => {
        return client.branch.findMany({
            where: {
                department: {
                    id: department_id
                }
            }
        });
    }
};

export default departmentRepository;