import Fellowship from "./Fellowship";

class MTechFellowship extends Fellowship {
    private fellowship_start_date?: Date;
    private fellowship_end_date?: Date;

    constructor(
        registration: string,
        month: Month,
        year: number,
        semester: number,
        fellowship_start_date?: Date,
        fellowship_end_date?: Date
    ) {
        super(registration, month, year, semester);
        this.fellowship_start_date = fellowship_start_date;
        this.fellowship_end_date = fellowship_end_date;
    }

    calculateFellowship(): number {
        this.getTotalDays();
        return 0;
    }
}

export default MTechFellowship;