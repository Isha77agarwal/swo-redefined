import { StudentRepository } from "../repositories/studentRepository";
import MTechFellowship from "../entities/fellowship/MTechFellowship";
import appConfig from "../appConfig";

/**
 * MTechFellowshipService handles fellowship tasks for M.Tech. students.
 */
export class MTechFellowshipService {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    /**
     * returns fresh fellowships for given department id, month, year and
     * session. Optional branch_id can be provided to filter the fellowships
     * by branch.
     * @param department_id
     * @param month
     * @param year
     * @param session_id
     * @param branch_id
     */
    async getFreshMTechFellowship(
        department_id: string,
        month: Month,
        year: number,
        session_id: string,
        branch_id?: string
    ): Promise<MTechFellowship[]> {
        const studentFellowshipData =
            await this.studentRepository.getMTechStudentsWithFellowshipByFilter(
                department_id,
                month,
                year,
                session_id,
                branch_id
            );
        const fellowships: MTechFellowship[] = [];
        for (const data of studentFellowshipData) {
            const student = appConfig.MTechStudentFactory.createFromStudentWithFreshFellowshipDetail(data);
            if(!student.isEligibleForFresh(month, year)) {
                continue;
            }
            fellowships.push(student.getFreshFellowship(month, year));
        }
        return fellowships;
    }
}
