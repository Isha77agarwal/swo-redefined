import MTechStudent from "../../../src/entities/student/MTechStudent";

// MTechStudent entity tests.
describe("MTechStudent", () => {
    let student: MTechStudent;

    // tests related to isEligibleForFresh method
    describe("isEligibleForFresh tests.", () => {
        const current_date = new Date();
        const current_month = current_date.getMonth();
        const current_year = current_date.getFullYear();
        const months: Month[] = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        beforeAll(() => {
            student = new MTechStudent(
                "TEST_MTECH",
                "TEST_DEPT",
                "TEST_BRANCH",
                3,
                "2022-23"
            );
        });

        it("should return false if student has not set fellowship_period", function () {
            expect(student.fellowship_start).toBeUndefined();
            // student should not be eligible for any month.
            months.forEach((month) =>
                expect(student.isEligibleForFresh(month, 2023)).toBeFalsy()
            );
        });

        it("should return true for students with valid result and fellowship start date", function() {
            // setting up fellowship start date and results.
            student.fellowship_start = current_date;
            student.results = [{semester: 2, passed: true}];

            const eligible_months = months.slice(current_month+1);
            const ineligible_months = months.reverse().slice(12-current_month, 17-current_month);

            eligible_months.forEach(month => expect(student.isEligibleForFresh(month, current_year)).toBeTruthy());
            ineligible_months.forEach(month => expect(student.isEligibleForFresh(month, current_year)).toBeFalsy());

            // resetting fellowship start date and results
            student.fellowship_start = undefined;
            student.results = [];
        });

        it("should return true for students who have failed in previous semester or result not available", function() {
            // setting up fellowship start date and results.
            student.fellowship_start = new Date(2023, 0, 1);

            // checking for after fellowship start date with no result
            expect(student.isEligibleForFresh("December", 2023)).toBeFalsy();

            // setting up failed result
            student.results = [{semester: 2, passed: false}];

            expect(student.isEligibleForFresh("December", 2023)).toBeFalsy();

            // resetting student object
            student.fellowship_start = undefined;
            student.results = [];
        });
    });
});
