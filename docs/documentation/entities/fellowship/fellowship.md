# abstract class Fellowship

Provides default implementation of common fellowship properties.

```ts
abstract class Fellowship {
    protected readonly _registration_no: string;
    protected readonly _month: Month;
    protected readonly _year: number;
    protected readonly _semester: number;
    protected readonly _session: string;
    protected _deduction_amount: number;
    protected _forwarded_to_accounts: boolean;
    protected _stipend: number;
    protected _deduction_dates: Date[];
    protected _pending_fill: boolean;
    protected _approved_by_accounts: boolean;

    protected constructor(
        registration: string,
        month: Month,
        year: number,
        semester: number,
        session: string
    ) {
    };

    abstract calculateFellowship(): number;

    protected isYearLeap(): boolean { }

    protected getTotalDays(): number { }
}
```

### properties

| name                   | type    | comment                                                                                                                                                                                                                                             |
|------------------------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| _registration_no       | string  | registration number of the student eg : 2020CA021 the first part of registration number([2020]CA021) is the year of admission the second part(2020[CA]021) is the department or branch code the last part is the roll / serial number (2020CA[021]) |
| _month                 | Month   | month for which fellowship is being awarded                                                                                                                                                                                                         |
| _year                  | number  | year for which fellowship is being awarded                                                                                                                                                                                                          |
| _semester              | number  | semester for which fellowship is being awarded                                                                                                                                                                                                      | 
| _session               | string  | represents the session for which this fellowship has been awarded. the session is represented as the current year and the last two digits of next year e.g. 2020-21                                                                                 |
| _deduction_dates       | Date[]  | dates for which fellowship is blocked/deducted                                                                                                                                                                                                      |
| _pending_fill          | boolean | marks if fellowship was filled after fresh window closed                                                                                                                                                                                            |
| _approved_by_accounts  | boolean | marks if fellowship has been approved by the accounts section                                                                                                                                                                                       |
| _forwarded_to_accounts | boolean | marks if fellowship has been forwarded to accounts section by department. If fellowship has been saved only then this is false.                                                                                                                     |

### methods

| name                  | return type | comment                                                                |
|-----------------------|-------------|------------------------------------------------------------------------|
| isYearLeap            | boolean     | returns true if the year property is a leap year                       |
| getTotalDays          | number      | returns total days in the month specified by month property            |
| _calculateFellowship_ | number      | abstract method that returns total amount for specified month and year |

### getters

| name                  | property               |
|-----------------------|------------------------|
| registration_no       | _registration_no       |
| semester              | _semester              |
| session               | _session               |
| deduction_dates       | _deduction_dates       |
| deduction_amount      | _deduction_amount      |
| forwarded_to_accounts | _forwarded_to_accounts |
| stipend               | _stipend               |
| month                 | _month                 |
| year                  | _year                  |
| approved_by_accounts  | _approved_by_accounts  | 
| pending_fill          | _pending_fill          |


### setters

| name                  | property               |
|-----------------------|------------------------|
| deduction_dates       | _deduction_dates       |
| deduction_amount      | _deduction_amount      |
| forwarded_to_accounts | _forwarded_to_accounts |
| stipend               | _stipend               |
| approved_by_accounts  | _approved_by_accounts  | 
| pending_fill          | _pending_fill          |
