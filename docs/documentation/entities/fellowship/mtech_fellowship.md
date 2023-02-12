# class MTechFellowship

`MTechFellowship` class represents the fellowship business logic for M.Tech students. It extends from the 
`Fellowship` class.

```ts
class MTechFellowship extends Fellowship {

    constructor(
        registration: string,
        month: Month,
        year: number,
        semester: number,
        session: string,
    ) {
        super(registration, month, year, semester, session);
    }

    calculateFellowship(): number {}
}
```