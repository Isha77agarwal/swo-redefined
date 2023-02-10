import MTechStudent from "../../entities/student/MTechStudent";
import appConfig from "../../appConfig";

/**
 * IMTechStudentFactory separates creation of MTechStudent objects from
 * MTechStudent class. It contains methods to create MTechStudent from
 * multiple data types.
 */
export interface IMTechStudentFactory {

    /**
     * Creates MTechStudent object from data from Student table including
     * data from Result, FellowshipBlock and MTechFellowship tables.
     * @see StudentWithFreshMTechFellowshipDetail
     * @param payload
     */
    createFromStudentWithFreshFellowshipDetail(
        payload: StudentWithFreshMTechFellowshipDetail
    ): MTechStudent;
}

// default implementation of IMTechStudentFactory
const MTechStudentFactory: IMTechStudentFactory = {
    createFromStudentWithFreshFellowshipDetail(
        payload: StudentWithFreshMTechFellowshipDetail
    ): MTechStudent {
        const student = new MTechStudent(
            payload.registration_no,
            payload.department_id,
            payload.branch_id,
            payload.semester,
            payload.session_id
        );
        student.fellowship_start = payload.JRF_start_date ?? undefined;
        student.fellowship_end = payload.JRF_end_date ?? undefined;
        student.presentation_date = payload.presentation_date ?? undefined;
        student.fellowships =
            appConfig.MTechFellowshipFactory.createFellowshipsFromStudentData(
                payload
            );
        student.results = payload.Result.map((result) => {
            return { semester: result.semester, passed: result.passed };
        });
        return student;
    },
};

export default MTechStudentFactory;
