import {
    StudentRepository,
} from "../repositories/studentRepository";
import MTechFellowship from "../entities/fellowship/MTechFellowship";
import {
    Student,
} from "@prisma/client";

type MTechStudentData = Omit<
    Student,
    | "password"
    | "salt"
    | "SRF_start_date"
    | "SRF_end_date"
    | "program_type"
>;

export class MTechFellowshipService {
    private studentRepository: StudentRepository;

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    /**
     * Checks whether the given student is eligible for fellowship or not.
     * @see https://deanstudentwelfare-mnnit.github.io/swo-redefined/#/fellowship?id=eligibility-criteria
     * @param student
     * @private
     */
    private isStudentEligibleForFresh(student: StudentWithFreshMTechFellowshipDetail): boolean {
        const current_date = new Date();
        if(student.JRF_start_date === null || student.JRF_start_date > current_date)
            return false;
        if(student.JRF_end_date !== null && student.JRF_end_date < current_date)
            return false;
        if(student.MTechFellowship.length !== 0)
            return false;
        if(student.semester !== 1) {
            let last_sem_result_present = false;
            for(const result of student.Result) {
                if(result.semester === student.semester - 1) {
                    if(!result.passed)
                        return false;
                    last_sem_result_present = true;
                    break;
                }
            }
            if(!last_sem_result_present) return false;
        }
        return true;
    }

    private createMTechFellowshipData(
        studentData: MTechStudentData,
        month: Month,
        year: number
    ): MTechFellowship {
        return new MTechFellowship(
            studentData.registration_no,
            month,
            year,
            studentData.semester,
            studentData.JRF_start_date || undefined,
            studentData.JRF_end_date || undefined
        );
    }

    async getFreshMTechFellowship(
        department_id: string,
        month: Month,
        year: number,
        session_id: string,
        branch_id?: string
    ): Promise<MTechFellowship[]> {
        const students =
            await this.studentRepository.getMTechStudentsWithFellowshipByFilter(
                department_id,
                month,
                year,
                session_id,
                branch_id
            );
        const fellowships: MTechFellowship[] = [];
        for (const student of students) {
            console.log(student);
            if(!this.isStudentEligibleForFresh(student)) {
                continue;
            }
            const studentData: MTechStudentData = {
                registration_no: student.registration_no,
                semester: student.semester,
                presentation_date: student.presentation_date,
                session_id: student.session_id,
                branch_id: student.branch_id,
                JRF_start_date: student.JRF_start_date,
                JRF_end_date: student.JRF_end_date,
                department_id: student.department_id,
            };

            const fellowshipData = this.createMTechFellowshipData(studentData, month, year);
            fellowshipData.calculateFellowship();
            fellowships.push(
                fellowshipData
            );
        }
        return fellowships;
    }
}
