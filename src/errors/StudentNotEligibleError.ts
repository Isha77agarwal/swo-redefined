/**
 * Thrown when student does not pass the eligibility criteria for any task.
 */
class StudentNotEligibleError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export default StudentNotEligibleError;