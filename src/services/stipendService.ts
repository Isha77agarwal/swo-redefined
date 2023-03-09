import { IStipendRepository } from "../repositories/stipendRepository";
import appConfig from "../appConfig";

/**
 * StipendService is used to get stipend amount information for M.Tech. and
 * Ph.D. fellowships.
 */
export class StipendService {

    private repository: IStipendRepository;
    protected cached_mtech_stipend_data: MTechStipend[] = [];

    constructor(repository: IStipendRepository) {
        this.repository = repository;
    }

    protected async checkCache() {
        if(this.cached_mtech_stipend_data.length === 0) {
            this.cached_mtech_stipend_data = await this.repository.getMTechStipend();
        }
    }

    async getLatestMTechStipend(): Promise<number> {
        await this.checkCache();
        return this.cached_mtech_stipend_data[0].amount;
    }

}

const stipendService = new StipendService(appConfig.StipendRepository);