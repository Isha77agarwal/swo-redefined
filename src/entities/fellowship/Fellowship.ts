abstract class Fellowship {
    private registration: string;
    private readonly month: Month;
    private readonly year: number;
    private semester: number;
    private deduction_dates: number[];
    private pending_fill: boolean;
    private approved_by_accounts: boolean;

    constructor(
        registration: string,
        month: Month,
        year: number,
        semester: number,
        deduction_dates: number[],
        pending_fill: boolean,
        approved_by_accounts: boolean
    ) {
        this.registration = registration;
        this.month = month;
        this.year = year;
        this.semester = semester;
        this.deduction_dates = deduction_dates;
        this.pending_fill = pending_fill;
        this.approved_by_accounts = approved_by_accounts;
    }

    private isYearLeap(): boolean {
        return (
            (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0
        );
    }

    private getTotalDays(): number {
        switch (this.month) {
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

    abstract calculateFellowship(): number;
}

export default Fellowship;
