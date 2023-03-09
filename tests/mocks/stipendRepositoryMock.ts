import { IStipendRepository } from "../../src/repositories/stipendRepository";

export default function createStipendRepositoryMock(): IStipendRepository {
    return {
        getMTechStipend(): Promise<MTechStipend[]> {
            return Promise.resolve(
                [
                    {
                        start_date: new Date(2022, 0, 1),
                        amount: 30000
                    },
                    {
                        start_date: new Date(2022, 10, 1),
                        amount: 34000
                    }
                ]
            );
        }
    };
}