import { MTechFellowshipService } from "../../src/services/mtechFellowshipService";
import {studentRepository, StudentRepository} from "../../src/repositories/studentRepository";
import createStudentRepositoryMock from "../mocks/studentRepositoryMock";

// FellowshipService tests.
describe("MTechFellowshipService", () => {
    let testFellowshipService: MTechFellowshipService;
    let mockStudentRepository: StudentRepository;

    beforeAll(() => {
        mockStudentRepository = createStudentRepositoryMock();
        testFellowshipService = new MTechFellowshipService(mockStudentRepository);
    });

    describe("getAllFreshMTechFellowship",  () => {
        it("should return fresh fellowship of all eligible MTech Students of all months and year.", async function () {
            const testMTechFellowships = await testFellowshipService.getFreshMTechFellowship("TEST_DEPT", "January", 2023, "2020-21");
            expect(testMTechFellowships).not.toBeNull();
            expect(testMTechFellowships.length).not.toBe(0);
        });
    });
});
