# class MTechStudent

It extends from the abstract base `Student` class and add methods and properties to deal with fellowships regarding 
M.Tech students.

```ts
class MTechStudent extends Student {
    static NOT_ELIGIBLE_FOR_FRESH_ERR = "Student is not eligible for fresh fellowship.";
    private _fellowship_start?: Date;
    private _fellowship_end?: Date;
    
    private dateInFellowshipPeriod(date: Date): boolean {}
}
```

### properties

| name                       | type   | comment                                                                                             |
|----------------------------|--------|-----------------------------------------------------------------------------------------------------|
| NOT_ELIGIBLE_FOR_FRESH_ERR | string | error string to throw when getFreshFellowship is called and student is not eligible for fellowship. |
| _fellowship_start          | Date   | start date after which student is eligible to get fellowship.                                       |
| _fellowship_end            | Date   | end date after which student is eligible to get fellowship.                                         |


### method

| name                   | return type | comment                                                               |
|------------------------|-------------|-----------------------------------------------------------------------|
| dateInFellowshipPeriod | boolean     | checks if given date is under the fellowship duration of the student. |


### setters

| name             | property          |
|------------------|-------------------|
| fellowship_start | _fellowship_start |
| fellowship_end   | _fellowship_end   |
