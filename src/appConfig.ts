import MTechStudentFactory, {IMTechStudentFactory} from "./factories/student/MTechStudentFactory";
import MTechFellowshipFactory, {IMTechFellowshipFactory} from "./factories/fellowship/MTechFellowshipFactory";

/**
 * AppConfig interface defines the common modules of the project.
 * It is used for dependency injection.
 */
interface AppConfig {
    MTechStipend: number;
    MTechStudentFactory: IMTechStudentFactory;
    MTechFellowshipFactory: IMTechFellowshipFactory;
}

// default implementation of AppConfig
const appConfig: AppConfig = {
    MTechStipend: 15000,
    MTechStudentFactory: MTechStudentFactory,
    MTechFellowshipFactory: MTechFellowshipFactory
};

export default appConfig;