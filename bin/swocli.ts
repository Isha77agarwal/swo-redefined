import { program } from "commander";
import { createPromptModule } from "inquirer";
import { authService } from "../src/services/authService";

const prompt = createPromptModule();

// description
program
    .name("SWO CLI")
    .description("CLI to manage SWO Portal tasks.")
    .version("0.1.0");

const required = (input: string) => {
    return !(input === undefined || input.length === 0);
};

// create admin account command
program
    .command("createAdmin")
    .description("Create a new admin account with given ID and password.")
    .action(() => {
        prompt([
            {
                type: "input",
                name: "username",
                message: "Username for admin: ",
                validate: (input) => required(input) ?? "Username is required!",
            },
            {
                type: "password",
                name: "password",
                mask: "*",
                message: "Password for admin: ",
                validate: (input) => required(input) ?? "Password is required!",
            },
            {
                type: "input",
                name: "name",
                message: "Name of admin: ",
                validate: (input) => required(input) ?? "Name is required!",
            },
            {
                type: "input",
                name: "mobile",
                message: "Mobile of admin: ",
                validate: (input) => {
                    if (!required(input)) {
                        return "Mobile is required!";
                    }
                    if (input.length !== 10 || /[a-zA-Z]/.test(input)) {
                        return "Mobile number must be of 10 digits.";
                    }
                    return true;
                },
            },
            {
                type: "input",
                name: "email",
                message: "Email of admin: ",
                validate: (input) => {
                    if (!required(input)) {
                        return "Email is required!";
                    }
                    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input)) {
                        return "Email is not valid!";
                    }
                    return true;
                },
            },
            {
                type: "input",
                name: "department",
                message: "Department of admin: (Leave empty if no dept) ",
            },
            {
                type: "confirm",
                name: "superadmin",
                message: "Is this super admin?: ",
                default: false,
            },
        ])
            .then((answers) =>
                authService.createAdmin({
                    username: answers.username,
                    password: answers.password,
                    name: answers.name,
                    email: answers.email,
                    mobile: answers.mobile,
                    department_id:
                        answers.department.length === 0
                            ? undefined
                            : answers.department,
                    is_super_admin: answers.superadmin,
                })
            )
            .then(() => {
                console.log("Admin successfully created!");
            })
            .catch((error) => {
                console.log(error);
            });
    });
program.parse();
