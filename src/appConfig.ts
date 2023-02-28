import MTechStudentFactory, {IMTechStudentFactory} from "./factories/student/MTechStudentFactory";
import MTechFellowshipFactory, {IMTechFellowshipFactory} from "./factories/fellowship/MTechFellowshipFactory";
import { IStipendRepository, StipendRepository } from "./repositories/stipendRepository";

/**
 * AppConfig interface defines the common modules of the project.
 * It is used for dependency injection.
 */
interface AppConfig {
    MTechStudentFactory: IMTechStudentFactory;
    MTechFellowshipFactory: IMTechFellowshipFactory;
    StipendRepository: IStipendRepository;
}

// default implementation of AppConfig
const appConfig: AppConfig = {
    MTechStudentFactory: MTechStudentFactory,
    MTechFellowshipFactory: MTechFellowshipFactory,
    StipendRepository: StipendRepository
};

export default appConfig;