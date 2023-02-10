import Fellowship from "../fellowship/Fellowship";

/**
 * Student is used to represent common data and business logic related to
 * students.
 */
abstract class Student {
    protected constructor(
        registration_no: string,
        department_id: string,
        branch_id: string,
        semester: number,
        session_id: string
    ) {
        this._registration_no = registration_no;
        this._department_id = department_id;
        this._branch_id = branch_id;
        this._semester = semester;
        this._presentation_date = undefined;
        this._fellowships = [];
        this._session_id = session_id;
        this._results = [];
    }

    /**
     * registration number of student eg : 2020CA021
     * the first part of registration number([2020]CA021) is the year of admission
     * the second part(2020[CA]021) is the department or branch code
     * the last part is the roll / serial number (2020CA[021])
     * @protected
     */
    protected _registration_no: string;

    get registration_no(): string {
        return this._registration_no;
    }

    set registration_no(value: string) {
        this._registration_no = value;
    }

    /**
     * stores the department id of student's department
     * @protected
     */
    protected _department_id: string;

    set department_id(value: string) {
        this._department_id = value;
    }

    /**
     * stores the branch id of student's branch
     * @protected
     */
    protected _branch_id: string;

    set branch_id(value: string) {
        this._branch_id = value;
    }

    /**
     * stores semester of student
     * @protected
     */
    protected _semester: number;

    get semester(): number {
        return this._semester;
    }

    set semester(value: number) {
        this._semester = value;
    }

    /**
     * presentation date of student. presentation date marks the end date for
     * fellowship period of student.
     * @protected
     */
    protected _presentation_date?: Date;

    set presentation_date(value: Date | undefined) {
        this._presentation_date = value;
    }

    /**
     * stores the fellowships awarded to students.
     * @protected
     */
    protected _fellowships: Fellowship[];

    set fellowships(value: Fellowship[]) {
        this._fellowships = value;
    }

    /**
     * current session of student
     * @protected
     */
    protected _session_id: string;

    get session_id(): string {
        return this._session_id;
    }

    set session_id(value: string) {
        this._session_id = value;
    }

    /**
     * results of student
     * @protected
     */
    protected _results: Result[];

    set results(value: Result[]) {
        this._results = value;
    }

    /**
     * returns true if student is eligible for fresh fellowship for the given
     * month and year.
     * @param month
     * @param year
     * @abstract
     */
    abstract isEligibleForFresh(month: Month, year: number): boolean;

    /**
     * returns true if student is eligible for pending fellowship for the given
     * month and year.
     * @param month
     * @param year
     * @abstract
     */
    abstract isEligibleForPending(month: Month, year: number): boolean;

    /**
     * calculates the fellowship amount for given fellowship.
     * @param fellowship
     * @abstract
     */
    abstract calculateFellowshipAmount(fellowship: Fellowship): number;

    /**
     * returns fresh fellowship for given month and year.
     * if student is not eligible for fresh fellowship then
     * StudentNotEligibleError is thrown.
     * @param month
     * @param year
     * @abstract
     */
    abstract getFreshFellowship(month: Month, year: number): Fellowship;

    /**
     * Returns true if the student passed in the given semester.
     * @param semester
     * @protected
     */
    protected passedInSemester(semester: number): boolean {
        // new student, no result uploaded
        if (semester == 0) return true;

        // checking all results
        for (const result of this._results) {
            if (result.semester === semester) return result.passed;
        }

        // result not found
        return false;
    }

    /**
     * Returns true if fellowship has already been awarded for this month.
     * @param month
     * @param year
     */
    protected isFellowshipAwarded(month: Month, year: number): boolean {
        for (const fellowship of this._fellowships) {
            if (fellowship.month === month && fellowship.year === year) {
                if (fellowship.forwarded_to_accounts) {
                    // fellowship filled by department
                    return true;
                }

                if (
                    !fellowship.forwarded_to_accounts &&
                    fellowship.pending_fill
                ) {
                    // fellowship not filled by department and in pending
                    return false;
                }
            }
        }
        return false;
    }
}

export default Student;
