import { MTechFellowshipService } from "../../src/services/mtechFellowshipService";
import { StudentRepository } from "../../src/repositories/studentRepository";
import createStudentRepositoryMock from "../mocks/studentRepositoryMock";

// FellowshipService tests.
describe("MTechFellowshipService", () => {
    let testFellowshipService: MTechFellowshipService;
    let mockStudentRepository: StudentRepository;

    beforeAll(() => {
        mockStudentRepository = createStudentRepositoryMock();
        testFellowshipService = new MTechFellowshipService(
            mockStudentRepository
        );
    });

    describe("getAllFreshMTechFellowship", () => {
        it("should return fresh fellowship of all eligible MTech Students of all months and year.", async function () {

            const valid_fellowship_reg_no = ["TEST_REG_01", "TEST_REG_05", "TEST_REG_08"];
            const invalid_fellowship_reg_no = ["TEST_REG_02", "TEST_REG_03", "TEST_REG_04", "TEST_REG_06", "TEST_REG_07"];

            const testMTechFellowships =
                await testFellowshipService.getFreshMTechFellowship(
                    "TEST_DEPT",
                    "January",
                    2023,
                    "2020-21"
                );

            expect(testMTechFellowships).not.toBeNull();
            expect(testMTechFellowships.length).not.toBe(0);

            valid_fellowship_reg_no.map(value => expect(testMTechFellowships).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        registration_no: value,
                    }),
                ])
            ));

            invalid_fellowship_reg_no.map(value => expect(testMTechFellowships).toEqual(
                expect.not.arrayContaining([
                    expect.objectContaining({
                        registration_no: value,
                    }),
                ])
            ));
        });
    });
});
