import MTechStudent from "../../../src/entities/student/MTechStudent";
import MTechFellowship from "../../../src/entities/fellowship/MTechFellowship";

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

        it("should return true for students with valid result and fellowship start date", function () {
            // setting up fellowship start date and results.
            student.fellowship_start = current_date;
            student.results = [{ semester: 2, passed: true }];

            const eligible_months = months.slice(current_month + 1);
            const ineligible_months = months
                .reverse()
                .slice(12 - current_month, 17 - current_month);

            eligible_months.forEach((month) =>
                expect(
                    student.isEligibleForFresh(month, current_year)
                ).toBeTruthy()
            );
            ineligible_months.forEach((month) =>
                expect(
                    student.isEligibleForFresh(month, current_year)
                ).toBeFalsy()
            );

            // resetting fellowship start date and results
            student.fellowship_start = undefined;
            student.results = [];
        });

        it("should return false for students who have failed in previous semester or result not available", function () {
            // setting up fellowship start date and results.
            student.fellowship_start = new Date(2023, 0, 1);

            // checking for after fellowship start date with no result
            expect(student.isEligibleForFresh("December", 2023)).toBeFalsy();

            // setting up failed result
            student.results = [{ semester: 2, passed: false }];

            expect(student.isEligibleForFresh("December", 2023)).toBeFalsy();

            // resetting student object
            student.fellowship_start = undefined;
            student.results = [];
        });

        it("should return false for students who have already received the fellowship", function () {
            student.fellowships = [
                new MTechFellowship(
                    student.registration_no,
                    "January",
                    2023,
                    student.semester,
                    student.session_id
                ),
            ];

            expect(student.isEligibleForFresh("January", 2023)).toBeFalsy();

            student.fellowships = [];
        });

        it("should return false for students who have presentation date before fellowship_end date and presentation date has passed.", function () {
            student.fellowship_start = new Date(2023, 0, 1);
            student.fellowship_end = new Date(2023, 11, 31);
            student.presentation_date = new Date(2023, 6, 25);

            expect(student.isEligibleForFresh("October", 2023)).toBeFalsy();

            student.fellowship_start = undefined;
            student.fellowship_end = undefined;
            student.presentation_date = undefined;
        });
    });

    // tests related to getFreshFellowship
    describe("getFreshFellowship tests.", () => {
        beforeAll(() => {
            student = new MTechStudent(
                "TEST_MTECH",
                "TEST_DEPT",
                "TEST_BRANCH",
                3,
                "2022-23"
            );
        });

        it("should return default fresh fellowship when fellowship not filled before.", function () {
            // setting such that student is eligible for fellowship for any month and year
            const mockIsEligibleForFresh = jest.spyOn(
                MTechStudent.prototype,
                "isEligibleForFresh"
            );
            mockIsEligibleForFresh.mockImplementation(() => true);

            const fellowship = student.getFreshFellowship("January", 2023);
            expect(fellowship.month).toBe("January");
            expect(fellowship.year).toBe(2023);
            expect(fellowship.deduction_dates).toHaveLength(0);
            expect(fellowship.semester).toBe(3);

            mockIsEligibleForFresh.mockRestore();
        });

        it("should throw error when student is not eligible", function () {
            const mockIsEligibleForFresh = jest.spyOn(
                MTechStudent.prototype,
                "isEligibleForFresh"
            );
            mockIsEligibleForFresh.mockImplementation(() => false);

            expect(() => student.getFreshFellowship("January", 2023)).toThrow(
                MTechStudent.NOT_ELIGIBLE_FOR_FRESH_ERR
            );
        });
    });

    // tests related to isFellowshipAwarded method
    describe("isFellowshipAwarded tests.", () => {
        let student: TestMTechStudent;

        /*
         * since isFellowshipAwarded is a protected member we use a
         * wrapper function to access it and return its value from a
         * test class.
         */
        class TestMTechStudent extends MTechStudent {
            isFellowshipAwardedWrapper(month: Month, year: number) {
                return this.isFellowshipAwarded(month, year);
            }
        }

        beforeAll(() => {
            student = new TestMTechStudent(
                "TEST_MTECH",
                "TEST_DEPT",
                "TEST_BRANCH",
                3,
                "2022-23"
            );
        });

        it("should return false if fellowship not present for month and year.", function () {
            expect(
                student.isFellowshipAwardedWrapper("January", 2023)
            ).toBeFalsy();
        });

        it("should return true when fellowship was filled/forwarded in fresh mode.", function () {
            const mTechFellowship = new MTechFellowship(
                student.registration_no,
                "January",
                2023,
                1,
                "2022-23"
            );
            mTechFellowship.forwarded_to_accounts = true;
            mTechFellowship.pending_fill = false;
            student.fellowships = [mTechFellowship];
            expect(
                student.isFellowshipAwardedWrapper("January", 2023)
            ).toBeTruthy();
            student.fellowships = [];
        });

        it("should return true when fellowship has been filled/forwarded in pending mode.", function () {
            const mTechFellowship = new MTechFellowship(
                student.registration_no,
                "January",
                2023,
                1,
                "2022-23"
            );
            mTechFellowship.forwarded_to_accounts = true;
            mTechFellowship.pending_fill = true;
            student.fellowships = [mTechFellowship];
            expect(
                student.isFellowshipAwardedWrapper("January", 2023)
            ).toBeTruthy();
            student.fellowships = [];
        });

        it("should return false when student fellowship has saved in fresh mode", function () {
            const mTechFellowship = new MTechFellowship(
                student.registration_no,
                "January",
                2023,
                1,
                "2022-23"
            );
            mTechFellowship.forwarded_to_accounts = false;
            mTechFellowship.pending_fill = false;
            student.fellowships = [mTechFellowship];
            expect(
                student.isFellowshipAwardedWrapper("January", 2023)
            ).toBeFalsy();
            student.fellowships = [];
        });

        it("should return false when student fellowship has saved in pending mode", function () {
            const mTechFellowship = new MTechFellowship(
                student.registration_no,
                "January",
                2023,
                1,
                "2022-23"
            );
            mTechFellowship.forwarded_to_accounts = false;
            mTechFellowship.pending_fill = true;
            student.fellowships = [mTechFellowship];
            expect(
                student.isFellowshipAwardedWrapper("January", 2023)
            ).toBeFalsy();
            student.fellowships = [];
        });
    });
});
