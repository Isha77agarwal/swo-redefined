abstract class Fellowship {
    private registration_no: string;
    private readonly month: Month;
    private readonly year: number;
    private semester: number;
    private deduction_dates: Date[];
    private pending_fill: boolean;
    private approved_by_accounts: boolean;

    protected constructor(
        registration: string,
        month: Month,
        year: number,
        semester: number,
    ) {
        this.registration_no = registration;
        this.month = month;
        this.year = year;
        this.semester = semester;
        this.deduction_dates = [];
        this.pending_fill = false;
        this.approved_by_accounts = false;
    }

    protected isYearLeap(): boolean {
        return (
            (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0
        );
    }

    protected getTotalDays(): number {
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
