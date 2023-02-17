import { StudentRepository, studentRepository} from "../repositories/studentRepository";
import crypto from "crypto";

export type Student = {
    registration_no:String;
};
export class StudentService {
    private studentRepository: StudentRepository;

    // static readonly USER_NOT_EXISTS_ERROR = "User with provided username doesn't exist.";
    // static readonly PASSWORD_ERROR = "Passwords are not same!";

    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

   
    async findStudent(registration: string): Promise<Student | null> {
        const student = await this.studentRepository.getStudentByRegistration(registration);
        if (student === null) {
            throw new Error("User not found");
        }
       return student;
    }

}

export const studentService: StudentService = new StudentService(studentRepository);
