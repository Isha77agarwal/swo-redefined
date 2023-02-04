import {
    studentRepository,
    StudentRepository,
} from "../repositories/studentRepository";
import MTechFellowship from "../entities/fellowship/MTechFellowship";

export class MTechFellowshipService {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async getFreshMTechFellowship(
        department_id: string,
        month: Month,
        year: number,
        session_id: string,
        branch_id?: string
    ): Promise<MTechFellowship[]> {
        const students =
            studentRepository.getMTechStudentsWithFellowshipByFilter(
                department_id,
                month,
                year,
                session_id,
                branch_id
            );

        return [];
    }
}
