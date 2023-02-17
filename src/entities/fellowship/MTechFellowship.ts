import Fellowship from "./Fellowship";

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
        session: string,
    ) {
        super(registration, month, year, semester, session);
    }

    /**
     * Calculates the stipend of MTechFellowship
     * TODO implement
     */
    calculateFellowship(): number {
        this.getTotalDays();
        this.isYearLeap();
        return 0;
    }
}

export default MTechFellowship;