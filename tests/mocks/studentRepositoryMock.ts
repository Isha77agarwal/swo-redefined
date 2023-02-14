import { StudentRepository } from "../../src/repositories/studentRepository";
import { Prisma, Student } from "@prisma/client";
import { AuthService } from "../../src/services/authService";
import {
    getMonthIndex,
    getPreviousMonth,
} from "../../src/util/dateUtil";

export default function createStudentRepositoryMock(): StudentRepository {
    return {
        getStudentByRegistration(
            registration: string
        ): Promise<Student | null> {
            const salt = Buffer.from("TEST_SALT");
            const password = AuthService.getHashedPasswordForTesting(
                "TEST_PASS",
                salt
            );

            const student: Student = {
                registration_no: "TEST_REG",
                program_type: "BTech",
                semester: 0,
                password: password,
                salt: salt,
                presentation_date: null,
                JRF_start_date: null,
                JRF_end_date: null,
                SRF_start_date: null,
                SRF_end_date: null,
                session_id: "",
                branch_id: "",
                department_id: "",
            };

            if (registration === student.registration_no) {
                return Promise.resolve(student);
            }

            return Promise.resolve(null);
        },

        /**
         * This mock method returns a lot of type of data for testing.
         * TEST_REG_01: recently admitted, result not declared, fellowship period started -> IS ELIGIBLE.
         * TEST_REG_02: recently admitted, result not declared, fellowship period null -> NOT ELIGIBLE.
         * TEST_REG_03: recently admitted, result not declared, fellowship period started but later than current -> NOT ELIGIBLE
         * TEST_REG_04: old student, result not declared, fellowship period started -> NOT ELIGIBLE
         * TEST_REG_05: old student, result passed, fellowship period started -> IS ELIGIBLE
         * TEST_REG_06: old student, result passed, fellowship period started, fellowship awarded for current month -> NOT ELIGIBLE
         * TEST_REG_07: old student, result passed, fellowship period ended, fellowship not awarded for current month -> NOT ELIGIBLE
         * TEST_REG_08: old student, result passed, fellowship period ended but after 21st of previous month and before 20th of current month, fellowship not awarded for current month -> ELIGIBLE
         * @param department_id
         * @param month
         * @param year
         * @param session_id
         * @param branch_id
         */
        getMTechStudentsWithFellowshipByFilter(
            department_id: string,
            month: Month,
            year: number,
            session_id: string,
            branch_id?: string
        ): Promise<StudentWithFreshMTechFellowshipDetail[]> {
            const currentDate = new Date();
            const prevMonthIndex = getMonthIndex(getPreviousMonth(month));
            const prevMonthInYear = prevMonthIndex == 11 ? year - 1 : year;

            return Promise.resolve([
                // new student eligible for fellowship.
                {
                    registration_no: "TEST_REG_01",
                    program_type: "MTech",
                    semester: 1,
                    password: Buffer.from("password"),
                    salt: Buffer.from("salt"),
                    presentation_date: null,
                    JRF_start_date: new Date(
                        prevMonthInYear,
                        prevMonthIndex,
                        1
                    ),
                    JRF_end_date: null,
                    SRF_start_date: null,
                    SRF_end_date: null,
                    session_id: session_id,
                    branch_id: branch_id ?? "TEST_BRANCH",
                    department_id: department_id,
                    Result: [],
                    FellowshipBlock: [],
                    MTechFellowship: [],
                },
                // new student not eligible
                {
                    registration_no: "TEST_REG_02",
                    program_type: "MTech",
                    semester: 1,
                    password: Buffer.from("password"),
                    salt: Buffer.from("salt"),
                    presentation_date: null,
                    JRF_start_date: null,
                    JRF_end_date: null,
                    SRF_start_date: null,
                    SRF_end_date: null,
                    session_id: session_id,
                    branch_id: branch_id ?? "TEST_BRANCH",
                    department_id: department_id,
                    Result: [],
                    FellowshipBlock: [],
                    MTechFellowship: [],
                },
                // new student not eligible
                {
                    registration_no: "TEST_REG_03",
                    program_type: "MTech",
                    semester: 1,
                    password: Buffer.from("password"),
                    salt: Buffer.from("salt"),
                    presentation_date: null,
                    JRF_start_date: new Date(
                        new Date(
                            year,
                            currentDate.getMonth(),
                            currentDate.getDay()
                        ).getTime() +
                            5 * 24 * 60 * 60 * 1000
                    ), // 5 days after current
                    JRF_end_date: null,
                    SRF_start_date: null,
                    SRF_end_date: null,
                    session_id: session_id,
                    branch_id: branch_id ?? "TEST_BRANCH",
                    department_id: department_id,
                    Result: [],
                    FellowshipBlock: [],
                    MTechFellowship: [],
                },
                // old student not eligible
                {
                    registration_no: "TEST_REG_04",
                    program_type: "MTech",
                    semester: 3,
                    password: Buffer.from("password"),
                    salt: Buffer.from("salt"),
                    presentation_date: null,
                    JRF_start_date: new Date(
                        prevMonthInYear,
                        prevMonthIndex,
                        1
                    ),
                    JRF_end_date: null,
                    SRF_start_date: null,
                    SRF_end_date: null,
                    session_id: session_id,
                    branch_id: branch_id ?? "TEST_BRANCH",
                    department_id: department_id,
                    Result: [
                        {
                            semester: 1,
                            cpi: new Prisma.Decimal(9.0),
                            spi: new Prisma.Decimal(9.0),
                            passed: true,
                            student_id: "TEST_REG_04",
                        },
                    ],
                    FellowshipBlock: [],
                    MTechFellowship: [],
                },
                // old student eligible
                {
                    registration_no: "TEST_REG_05",
                    program_type: "MTech",
                    semester: 2,
                    password: Buffer.from("password"),
                    salt: Buffer.from("salt"),
                    presentation_date: null,
                    JRF_start_date: new Date(
                        prevMonthInYear,
                        prevMonthIndex,
                        1
                    ),
                    JRF_end_date: null,
                    SRF_start_date: null,
                    SRF_end_date: null,
                    session_id: session_id,
                    branch_id: branch_id ?? "TEST_BRANCH",
                    department_id: department_id,
                    Result: [
                        {
                            semester: 1,
                            cpi: new Prisma.Decimal(9.0),
                            spi: new Prisma.Decimal(9.0),
                            passed: true,
                            student_id: "TEST_REG_05",
                        },
                    ],
                    FellowshipBlock: [],
                    MTechFellowship: [],
                },
                // old student not eligible
                {
                    registration_no: "TEST_REG_06",
                    program_type: "MTech",
                    semester: 2,
                    password: Buffer.from("password"),
                    salt: Buffer.from("salt"),
                    presentation_date: null,
                    JRF_start_date: new Date(
                        prevMonthInYear,
                        prevMonthIndex,
                        1
                    ),
                    JRF_end_date: null,
                    SRF_start_date: null,
                    SRF_end_date: null,
                    session_id: session_id,
                    branch_id: branch_id ?? "TEST_BRANCH",
                    department_id: department_id,
                    Result: [
                        {
                            semester: 1,
                            cpi: new Prisma.Decimal(9.0),
                            spi: new Prisma.Decimal(9.0),
                            passed: true,
                            student_id: "TEST_REG_06",
                        },
                    ],
                    FellowshipBlock: [],
                    MTechFellowship: [
                        {
                            month: month,
                            session_id: `${year}-${(year % 100) + 1}`,
                            year: year,
                            stipend: 15000,
                            approved_by_accounts: true,
                            pending_fill: false,
                            forwarded_to_accounts: true,
                            semester: 2,
                            deductions: 0,
                            deduction_dates: {},
                            branch_id: branch_id ?? "TEST_BRANCH",
                            department_id: "TEST_DEPT",
                            registration_no: "TEST_REG_06",
                        },
                    ],
                },
                // old student not eligible
                {
                    registration_no: "TEST_REG_07",
                    program_type: "MTech",
                    semester: 6,
                    password: Buffer.from("password"),
                    salt: Buffer.from("salt"),
                    presentation_date: null,
                    JRF_start_date: new Date(
                        2020,
                        0,
                        1
                    ),
                    JRF_end_date: new Date(2020, 0, 2),
                    SRF_start_date: null,
                    SRF_end_date: null,
                    session_id: session_id,
                    branch_id: branch_id ?? "TEST_BRANCH",
                    department_id: department_id,
                    Result: [
                        {
                            semester: 5,
                            cpi: new Prisma.Decimal(9.0),
                            spi: new Prisma.Decimal(9.0),
                            passed: true,
                            student_id: "TEST_REG_06",
                        },
                    ],
                    FellowshipBlock: [],
                    MTechFellowship: [],
                },
                // old student eligible
                {
                    registration_no: "TEST_REG_08",
                    program_type: "MTech",
                    semester: 6,
                    password: Buffer.from("password"),
                    salt: Buffer.from("salt"),
                    presentation_date: null,
                    JRF_start_date: new Date(
                        prevMonthInYear,
                        prevMonthIndex,
                        1
                    ),
                    JRF_end_date:
                        currentDate.getDay() > 1
                            ? new Date(year, getMonthIndex(month), 1)
                            : new Date(prevMonthInYear, prevMonthIndex, 25),
                    SRF_start_date: null,
                    SRF_end_date: null,
                    session_id: session_id,
                    branch_id: branch_id ?? "TEST_BRANCH",
                    department_id: department_id,
                    Result: [
                        {
                            semester: 5,
                            cpi: new Prisma.Decimal(9.0),
                            spi: new Prisma.Decimal(9.0),
                            passed: true,
                            student_id: "TEST_REG_06",
                        },
                    ],
                    FellowshipBlock: [],
                    MTechFellowship: [],
                },
            ]);
        },
    };
}
