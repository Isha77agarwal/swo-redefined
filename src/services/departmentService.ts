import departmentRepository, { DepartmentRepository } from "../repositories/departmentRepository";
import { Branch } from "@prisma/client";

export class DepartmentService {

    private readonly departmentRepository: DepartmentRepository;

    constructor(departmentRepository: DepartmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    async getAllBranchesOfDepartment(department_id: string): Promise<Branch[]> {
        return this.departmentRepository.getDepartmentBranchesByID(department_id);
    }
}

export const departmentService = new DepartmentService(departmentRepository);