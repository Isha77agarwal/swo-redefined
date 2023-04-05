import { StipendService } from "../../src/services/stipendService";
import createStipendRepositoryMock from "../mocks/stipendRepositoryMock";

describe("Stipend Service tests", () => {

    describe("getLatestMTechStipend", () => {

        let stipendService: StipendService;

        beforeAll(() => {
            const stipendRepositoryMock = createStipendRepositoryMock();
            stipendService = new StipendService(stipendRepositoryMock);
        });

        it("should return the latest stipend.", async function() {
            expect(await stipendService.getLatestMTechStipend()).not.toBe(0);
        });

    });

});