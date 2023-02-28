import Fellowship from "./Fellowship";
import { daysInMonth, getPreviousMonth } from "../../util/dateUtil";

/**
 * Represents fellowship for MTech student.
 * @extends Fellowship
 */
class MTechFellowship extends Fellowship {
    constructor(
        registration: string,
        month: Month,
        year: number,
        semester: number,
        session: string
    ) {
        super(registration, month, year, semester, session);
        this._full_stipend_amount = 0;
    }

    protected _full_stipend_amount: number;

    get full_stipend_amount(): number {
        return this._full_stipend_amount;
    }

    set full_stipend_amount(value: number) {
        this._full_stipend_amount = value;
    }

    /**
     * Calculates the stipend of MTechFellowship on per day basis rounded off
     * to nearest whole number.
     */
    calculateFellowship(): number {
        // number of days for which fellowship has to be given.
        // it depends on the number of days in the previous month.
        const days_in_month = daysInMonth(
            getPreviousMonth(this._month),
            this._year
        );
        const per_day_amount = this._full_stipend_amount / days_in_month;
        const total_payable_days = days_in_month - this.deduction_dates.length;
        return Math.round(total_payable_days * per_day_amount);
    }
}

export default MTechFellowship;
