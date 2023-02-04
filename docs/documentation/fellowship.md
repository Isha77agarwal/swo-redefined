# Fellowship

Fellowships are the core entities of the application. Each type of fellowship must
extend from the base abstract `Fellowship` class. It should implement all the abstract
methods.

## abstract class Fellowship

Provides default implementation of common fellowship properties.

```ts
abstract class Fellowship {
    private registration: string;
    private readonly month: Month;
    private readonly year: number;
    private semester: number;
    private deduction_dates: number[];
    private pending_fill: boolean;
    private approved_by_accounts: boolean;

    constructor(
        registration,
        month,
        year,
        semester,
        deduction_dates,
        pending_fill,
        approved_by_accounts
    ) {}

    private isYearLeap(): boolean {
        // implementation hidden
    }

    private getTotalDays(): number {
        // implementation hidden
    }

    abstract calculateFellowship(): number;
}
```

### properties

| name                 | type     | comment                                                       |
|----------------------|----------|---------------------------------------------------------------|
| registration         | string   | registration number of the student                            |
| month                | Month    | month for which fellowship is being awarded                   |
| year                 | number   | year for which fellowship is being awarded                    |
| semester             | number   | semester for which fellowship is being awarded                | 
| deduction_dates      | number[] | dates for which fellowship is blocked/deducted                |
| pending_fill         | boolean  | marks if fellowship was filled after fresh window closed      |
| approved_by_accounts | boolean  | marks if fellowship has been approved by the accounts section |

### methods

| name                  | return type | comment                                                                |
|-----------------------|-------------|------------------------------------------------------------------------|
| isYearLeap            | boolean     | returns true if the year property is a leap year                       |
| getTotalDays          | number      | returns total days in the month specified by month property            |
| _calculateFellowship_ | number      | abstract method that returns total amount for specified month and year |
