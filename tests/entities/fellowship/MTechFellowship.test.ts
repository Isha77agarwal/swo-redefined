import { daysInMonthIndex } from "../../../src/util/dateUtil";
import Fellowship from "../../../src/entities/fellowship/Fellowship";
import MTechFellowship from "../../../src/entities/fellowship/MTechFellowship";

describe("MTechFellowship Tests", () => {
    describe("calculateFellowship method", () => {
        it("should return full amount without deduction for fellowship without deduction dates.", function () {
            const fellowshipFullMonth = new MTechFellowship(
                "TEST_REG",
                "January",
                2023,
                2,
                "2022-23"
            );
            fellowshipFullMonth.full_stipend_amount = 34000;
            expect(fellowshipFullMonth.calculateFellowship()).toBe(34000);
        });

        it("should return reduced amount for fellowship with deduction dates.", function () {
            const fellowshipWithDeductions = new MTechFellowship(
                "2022TH06",
                "October",
                2022,
                2,
                "2022-23"
            );
            fellowshipWithDeductions.full_stipend_amount = 12400;

            // deduction dates are only in one month
            fellowshipWithDeductions.deduction_dates = [
                new Date(2022, 9, 3),
                new Date(2022, 9, 6),
                new Date(2022, 9, 7),
            ];
            expect(fellowshipWithDeductions.calculateFellowship()).not.toBe(
                fellowshipWithDeductions.full_stipend_amount
            );
            expect(fellowshipWithDeductions.calculateFellowship()).toBe(11160);

            // deduction dates are in both months
            fellowshipWithDeductions.deduction_dates = [
                new Date(2022, 9, 3),
                new Date(2022, 9, 6),
                new Date(2022, 9, 7),
                new Date(2022, 8, 30),
            ];
            expect(fellowshipWithDeductions.calculateFellowship()).toBe(10747);
        });
    });

    // tests related to isDateInPeriodForMonth method
    describe("isDateInPeriodForMonth", () => {
        it("should return true for valid dates and false for invalid dates.", function () {
            for (let month = 1; month < 12; month++) {
                const date = new Date(2023, month, 15);
                const valid_dates = [];
                const invalid_dates = [];
                // 21st from previous month to 20th of current must be valid.
                for (
                    let day = 21;
                    day <= daysInMonthIndex(month - 1, 2023);
                    day++
                ) {
                    valid_dates.push(new Date(2023, month - 1, day));
                }
                for (let day = 1; day <= 20; day++) {
                    valid_dates.push(new Date(2023, month, day));
                }
                // rest all dates are outside the period.
                for (let day = 1; day <= 20; day++) {
                    invalid_dates.push(new Date(2023, month - 1, day));
                }
                for (
                    let day = 21;
                    day <= daysInMonthIndex(month, 2023);
                    day++
                ) {
                    invalid_dates.push(new Date(2023, month, day));
                }

                invalid_dates.forEach((value) =>
                    expect(
                        Fellowship.isDateInPeriodForMonth(date, value)
                    ).toBeFalsy()
                );

                valid_dates.forEach((value) =>
                    expect(
                        Fellowship.isDateInPeriodForMonth(date, value)
                    ).toBeTruthy()
                );
            }
        });
    });
});
