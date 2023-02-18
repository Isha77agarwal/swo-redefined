import { getMonthFromIndex, getMonthIndex, getPreviousMonth } from "../../util/dateUtil";

/**
 * Fellowship class is used to represent both MTech and PhD fellowships.
 * @abstract
 */
abstract class Fellowship {
    /**
     * registration number of student eg : 2020CA021
     * the first part of registration number([2020]CA021) is the year of admission
     * the second part(2020[CA]021) is the department or branch code
     * the last part is the roll / serial number (2020CA[021])
     * @protected
     */
    protected readonly _registration_no: string;

    /**
     * represents the month for which this fellowship has been awarded
     * @protected
     */
    protected readonly _month: Month;

    /**
     * represents the year for which this fellowship has been awarded
     * @protected
     */
    protected readonly _year: number;

    /**
     * represents the semester of student for which this fellowship has been awarded
     * @protected
     */
    protected readonly _semester: number;

    /**
     * represents the session for which this fellowship has been awarded
     * the session is represented as the current year and the last two digits
     * of next year
     *
     * e.g. 2020-21
     * @protected
     */
    protected readonly _session: string;

    protected constructor(
        registration: string,
        month: Month,
        year: number,
        semester: number,
        session: string
    ) {
        this._registration_no = registration;
        this._month = month;
        this._year = year;
        this._semester = semester;
        this._deduction_dates = [];
        this._pending_fill = false;
        this._approved_by_accounts = false;
        this._deduction_amount = 0;
        this._forwarded_to_accounts = false;
        this._stipend = 0;
        this._session = session;
    }

    get registration_no(): string {
        return this._registration_no;
    }

    get semester(): number {
        return this._semester;
    }

    get session(): string {
        return this._session;
    }

    /**
     * amount to be deducted from stipend based on deduction dates.
     * @protected
     */
    protected _deduction_amount: number;

    get deduction_amount(): number {
        return this._deduction_amount;
    }

    set deduction_amount(value: number) {
        this._deduction_amount = value;
    }

    /**
     * represents if fellowship has been sent to account section after filling.
     * @protected
     */
    protected _forwarded_to_accounts: boolean;

    get forwarded_to_accounts(): boolean {
        return this._forwarded_to_accounts;
    }

    set forwarded_to_accounts(value: boolean) {
        this._forwarded_to_accounts = value;
    }

    /**
     * amount associated with fellowship
     * @protected
     */
    protected _stipend: number;

    get stipend(): number {
        return this._stipend;
    }

    set stipend(value: number) {
        this._stipend = value;
    }

    /**
     * represents dates during which fellowship is not to be awarded.
     * @protected
     */
    protected _deduction_dates: Date[];

    get deduction_dates(): Date[] {
        return this._deduction_dates;
    }

    set deduction_dates(value: Date[]) {
        this._deduction_dates = value;
    }

    /**
     * set to true if fellowship has been filled in pending mode.
     * @protected
     */
    protected _pending_fill: boolean;

    get pending_fill(): boolean {
        return this._pending_fill;
    }

    set pending_fill(value: boolean) {
        this._pending_fill = value;
    }

    /**
     * set to true if fellowship has been processed and forwarded by account
     * section and will be credited to student's account
     * @protected
     */
    protected _approved_by_accounts: boolean;

    get approved_by_accounts(): boolean {
        return this._approved_by_accounts;
    }

    set approved_by_accounts(value: boolean) {
        this._approved_by_accounts = value;
    }

    get month(): Month {
        return this._month;
    }

    get year(): number {
        return this._year;
    }

    /**
     * calculates this fellowship's stipend amount.
     * @abstract
     */
    abstract calculateFellowship(): number;

    /**
     * returns true if the year is a leap year.
     * @protected
     */
    protected isYearLeap(): boolean {
        return (
            (this._year % 4 == 0 && this._year % 100 != 0) ||
            this._year % 400 == 0
        );
    }

    /**
     * returns total days in the month
     * @protected
     */
    protected getTotalDays(): number {
        switch (this._month) {
            case "April":
            case "June":
            case "September":
            case "November":
                return 30;
            case "February":
                return this.isYearLeap() ? 29 : 28;
            default:
                return 31;
        }
    }

    /**
     * Checks if date is in the fellowship filling cycle of month.
     * @param month month from date object for which period will be considered
     * @param date date which has to be checked if it belongs in period
     */
    static isDateInPeriodForMonth(month: Date, date: Date): boolean {
        const curr_year = month.getFullYear();
        const prev_year = month.getMonth() == 0 ? curr_year - 1 : curr_year;
        const prev_month = getMonthIndex(getPreviousMonth(getMonthFromIndex(month.getMonth())));
        const curr_month = month.getMonth();
        const duration_start = new Date(prev_year, prev_month, 21);
        const duration_end = new Date(curr_year, curr_month, 20);
        return duration_start <= date && date <= duration_end;
    }

}

export default Fellowship;
