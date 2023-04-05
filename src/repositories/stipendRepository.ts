import {MTechStipend} from "@prisma/client";
import client from "../prisma/client";

/**
 * IStipendRepository interface contains database query for utilities. The
 * following types of utilities are supported:
 *
 * 1. stipend utility: - getMTechStipend
 */
export interface IStipendRepository {
    /**
     * Gets all the entries of MTechStipend table.
     */
    getMTechStipend: () => Promise<MTechStipend[]>;
}

// default implementation of IStipendRepository
export const StipendRepository: IStipendRepository = {
    getMTechStipend: () => {
        return client.mTechStipend.findMany({
            orderBy: [
                {
                    start_date: "desc",
                }
            ]
        });
    }
};