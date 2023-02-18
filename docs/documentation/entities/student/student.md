# abstract class Student

Provides basic implementation of student's fellowship business side of things. It contains properties and 
methods to manage a student's fellowship. It keeps track of student's result and fellowship received by the student.

The abstract methods must be implemented by the subclasses that extend the `Student` class namely `MTechStudent` and `PhDStudent`.


```ts
abstract class Student {
    protected _registration_no: string;
    protected _department_id: string;
    protected _branch_id: string;
    protected _semester: number;
    protected _presentation_date?: Date;
    protected _fellowships: Fellowship[];
    protected _session_id: string;
    protected _results: Result[];

    abstract isEligibleForFresh(month: Month, year: number): boolean;

    abstract isEligibleForPending(month: Month, year: number): boolean;

    abstract getFreshFellowship(month: Month, year: number): Fellowship;

    protected passedInSemester(semester: number): boolean {
    }

    protected isFellowshipAwarded(month: Month, year: number): boolean {
    }
}
```

### properties

| name               | type         | comment                                                            |
|--------------------|--------------|--------------------------------------------------------------------|
| _registration_no   | string       | represents the registration number of student                      |
| _department_id     | string       | id of department to which student belongs                          |
| _branch_id         | string       | id of branch to which student belongs                              |
| _semester          | number       | semester in which the student belongs                              |
| _presentation_date | Date         | presentation date of student                                       |
| _fellowships       | Fellowship[] | objects of _Fellowship_ which represent the fellowships of student |
| _session_id        | string       | id of session to which student belongs to                          |
| _results           | Result       | results of student                                                 |

### methods

| name                   | return type | comment                                                                                                                     |
|------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------|
| _isEligibleForFresh_   | boolean     | returns true if student is eligible for fresh fellowship for given month and year                                           |
| _isEligibleForPending_ | boolean     | returns true if student is eligible for pending fellowship for given month and year                                         |
| _getFreshFellowship_   | Fellowship  | returns fresh fellowship for given month and year if eligible else error is thrown                                          |
| passedInSemester       | boolean     | returns true if student has passed in the given semester                                                                    |
| isFellowshipAwarded    | boolean     | returns true if fellowship has already been awarded to student for given month and year                                     |

### getters

| name            | property         |
|-----------------|------------------|
| registration_no | _registration_no |
| semester        | _semester        |
| session_id      | _session_id      |

### setters

| name              | property           |
|-------------------|--------------------|
| registration_no   | _registration_no   |
| department_id     | _department_id     |
| branch_id         | _branch_id         |
| semester          | _semester          |
| presentation_date | _presentation_date |
| fellowships       | _fellowships       |
| session_id        | _session_id        |
| results           | _results           |
