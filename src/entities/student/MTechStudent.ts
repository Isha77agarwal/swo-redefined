import Student from "./Student";
import Fellowship from "../fellowship/Fellowship";
import appConfig from "../../appConfig";
import StudentNotEligibleError from "../../errors/StudentNotEligibleError";
import { getMonthIndex } from "../../util/dateUtil";

/**
 * Used to represent the details and business logic related to an M.Tech.
 * student.
 */
class MTechStudent extends Student {
    static NOT_ELIGIBLE_FOR_FRESH_ERR =
        "Student is not eligible for fresh fellowship.";

    constructor(
        registration_no: string,
        department_id: string,
        branch_id: string,
        semester: number,
        session_id: string
    ) {
        super(registration_no, department_id, branch_id, semester, session_id);
        this._fellowship_start = undefined;
        this._fellowship_end = undefined;
    }

    // starting date of fellowship period. undefined when period not set for student.
    private _fellowship_start?: Date;

    set fellowship_start(value: Date | undefined) {
        this._fellowship_start = value;
    }

    // ending date of fellowship period. undefined when period not set for student.
    private _fellowship_end?: Date;

    set fellowship_end(value: Date | undefined) {
        this._fellowship_end = value;
    }

    /**
     * Returns a Fellowship of corresponding month and year, with values
     * if present else creates a new Fellowship object with default values.
     * @param month
     * @param year
     */
    getFreshFellowship(month: Month, year: number): Fellowship {
        for (const fellowship of this._fellowships) {
            if (fellowship.month === month && fellowship.year === year)
                return fellowship;
        }
        if (!this.isEligibleForFresh(month, year)) {
            throw new StudentNotEligibleError(
                MTechStudent.NOT_ELIGIBLE_FOR_FRESH_ERR
            );
        }
        return appConfig.MTechFellowshipFactory.createFreshFellowship(
            this,
            month,
            year
        );
    }

    /**
     * Returns true if the student is eligible for fresh fellowship for month
     * and year.
     * @param month
     * @param year
     */
    isEligibleForFresh(month: Month, year: number): boolean {
        const current_date = new Date(
            year,
            getMonthIndex(month),
            new Date().getDate()
        );

        // checking period
        if (!this.dateInFellowshipPeriod(current_date)) {
            return false;
        }

        // checking result
        if (!this.passedInSemester(this._semester - 1)) return false;

        // if fellowship already given return false
        return !this.isFellowshipAwarded(month, year);
    }

    isEligibleForPending(month: Month, year: number): boolean {
        return false;
    }

    /**
     * Given a date checks whether it falls in the fellowship period of the
     * student.
     * @param date
     * @private
     */
    private dateInFellowshipPeriod(date: Date): boolean {
        // fellowship period not started yet.
        if (
            this._fellowship_start === undefined ||
            this._fellowship_start > date
        )
            return false;

        if (this._fellowship_end !== undefined) {
            // fellowship period has not ended.
            if(this._fellowship_end >= date)
                return true;
            // ending date not in current fresh fellowship filling period
            if(!this.isDateInPeriodForMonth(date, this._fellowship_end))
                return false;
        }

        // presentation date is defined and has passed.
        return !(
            this._presentation_date !== undefined &&
            this._presentation_date < date
        );
    }
}

export default MTechStudent;
