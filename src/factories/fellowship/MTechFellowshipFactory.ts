import MTechFellowship from "../../entities/fellowship/MTechFellowship";
import {MTechFellowship as PrismaMTechFellowship} from "@prisma/client";
import MTechStudent from "../../entities/student/MTechStudent";

/**
 * IMTechFellowshipFactory separates creation of MTechFellowship objects from
 * MTechFellowship class. It contains methods to create MTechFellowship from
 * multiple data types.
 */
export interface IMTechFellowshipFactory {

    /**
     * Creates MTechFellowship object from data from MTechFellowship table.
     * @see PrismaMTechFellowship
     * @param data
     */
    createFellowshipFromStudentData(data: PrismaMTechFellowship) : MTechFellowship;

    /**
     * Creates MTechFellowship object from data from Student table including
     * data from Result, FellowshipBlock and MTechFellowship tables.
     * @see StudentWithFreshMTechFellowshipDetail
     * @param data
     */
    createFellowshipsFromStudentData(data: StudentWithFreshMTechFellowshipDetail) : MTechFellowship[];

    /**
     * Creates default MTechFellowship object from MTechStudent object, month
     * and year.
     * @param student MTechStudent object
     * @param month
     * @param year
     */
    createFreshFellowship(student: MTechStudent, month: Month, year: number) : MTechFellowship;
    
}

// default implementation of IMTechFellowshipFactory
const MTechFellowshipFactory: IMTechFellowshipFactory = {
    createFellowshipFromStudentData(
        data: PrismaMTechFellowship
    ): MTechFellowship {
        const fellowship = new MTechFellowship(
            data.registration_no,
            data.month,
            data.year,
            data.semester,
            data.session_id
        );
        // TODO set deduction dates here
        fellowship.approved_by_accounts = data.approved_by_accounts;
        fellowship.pending_fill = data.pending_fill;
        fellowship.stipend = data.stipend;
        fellowship.deduction_amount = data.deductions;
        fellowship.forwarded_to_accounts = data.forwarded_to_accounts;
        return fellowship;
    },

    createFellowshipsFromStudentData(
        data: StudentWithFreshMTechFellowshipDetail
    ): MTechFellowship[] {
        const fellowships: MTechFellowship[] = [];
        for (const fellowshipData of data.MTechFellowship) {
            fellowships.push(
                this.createFellowshipFromStudentData(fellowshipData)
            );
        }
        return fellowships;
    },

    createFreshFellowship(
        student: MTechStudent,
        month: Month,
        year: number
    ): MTechFellowship {
        const fellowship = new MTechFellowship(student.registration_no, month, year, student.semester, student.session_id);
        fellowship.pending_fill = false;
        fellowship.deduction_dates = [];
        return fellowship;
    },
};

export default MTechFellowshipFactory;