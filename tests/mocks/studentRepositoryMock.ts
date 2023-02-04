import {StudentRepository} from "../../src/repositories/studentRepository";
import {Student} from "@prisma/client";
import {AuthService} from "../../src/services/authService";

export default function createStudentRepositoryMock(): StudentRepository {
    return {
        getStudentByRegistration(registration: string): Promise<Student | null> {
            const salt = Buffer.from("TEST_SALT");
            const password = AuthService.getHashedPasswordForTesting("TEST_PASS", salt);

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
         * TEST_REG_02: recently admitted, result not declared, fellowship period not started -> NOT ELIGIBLE.
         * TEST_REG_03: old student, result not declared, fellowship period started -> NOT ELIGIBLE
         * @param department_id
         * @param month
         * @param year
         */
        getMTechStudentsWithFellowshipByFilter(department_id: string, month: Month, year: number): Promise<Student[]> {
            return Promise.resolve([
                // new student eligible for fellowship.
                {
                    registration_no: "TEST_REG_01",
                    program_type: "MTech",
                    semester: 1,
                    password: Buffer.from("password"),
                    salt: Buffer.from("salt"),
                    presentation_date: null,
                    JRF_start_date: new Date(2023, 0, 1),
                    JRF_end_date: null,
                    SRF_start_date: null,
                    SRF_end_date: null,
                    session_id: "TEST_SESSION",
                    branch_id: "TEST_BRANCH",
                    department_id: department_id,
                    Result: []
                },
                // // new student not eligible
                // {
                //     registration_no: "TEST_REG_02",
                //     program_type: program_type,
                //     semester: 1,
                //     password: Buffer.from("password"),
                //     salt: Buffer.from("salt"),
                //     presentation_date: null,
                //     JRF_start_date: null,
                //     JRF_end_date: null,
                //     SRF_start_date: null,
                //     SRF_end_date: null,
                //     session_id: "TEST_SESSION",
                //     branch_id: "TEST_BRANCH",
                //     department_id: department_id,
                //     Result: []
                // },
                // // old student eligible
                // {
                //     registration_no: "TEST_REG_03",
                //     program_type: program_type,
                //     semester: 2,
                //     password: Buffer.from("password"),
                //     salt: Buffer.from("salt"),
                //     presentation_date: null,
                //     JRF_start_date: new Date(2023, 0, 1),
                //     JRF_end_date: null,
                //     SRF_start_date: null,
                //     SRF_end_date: null,
                //     session_id: "TEST_SESSION",
                //     branch_id: "TEST_BRANCH",
                //     department_id: department_id,
                //     Result: []
                // },
            ]);
        },
    };
}
