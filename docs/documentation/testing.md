# Testing

Testing is used to check the correctness of the code at various architectural levels.
Testing also helps check for ripple effect along the codebase in case of updates and bug fixes.

> Tests are written using Jest framework whose documentation can be found [here](https://jestjs.io/docs/using-matchers).

## What should be tested?

- Entities
  - core business logic methods
  - factories used to create the entity objects.
- Services
  - public methods
- Repository
  - methods that use complex queries
- Routers
  - request parameters and request body for GET and POST
  - responses codes
  - error handling

## What should not be tested?

- constructors, getters, setters, static methods and properties
- private and protected methods directly
- User Interface Components like div, table, ui etc.
- repository methods that are simple queries.

## Important Terms

Some important terminology to know to work on the project are:

### TDD (Test Driven Development)

1. First write test but only enough to make the test fail.
2. Then write code but just enough to make the test pass.
3. Repeat

### Mocks

Mocking is a technique to isolate test subjects by replacing dependencies with objects that you can control and inspect.
In other words we try to simulate the functionality provided by dependencies like databases without executing their
logic and returning dummy results.

### Unit Testing

Unit testing is isolating modules and testing them independently. Unit tests are small any only check limited
functionality.

### Integration Testing

Integration testing is done by combining different components and testing them together.

## Testing Entities

Testing entities should be prioritized the most among others because they represent the core business logic.
Entities should not contain any dependencies and should be easy to isolate and unit test.

## Testing Repositories

Testing repositories should be performed by first adding test data in the test database and then using repositories
to access the data.

## Testing Services

Services depend on repositories, so mocking repositories becomes necessary to unit test services. Mock repositories
should be injected into service objects either through constructor or by using setters.

### Mocking repositories
- create a new file for mock repository if it does not exist in the `mocks` directory
- create a new function that returns an object of interface of repository to be mocked.
- use this mock repository to create service objects while testing.

## Testing Routers

Routers should undergo both unit testing and integration testing.

Unit testing should be done to check request parameters and request body for required data.
Integration testing should be done to check the response data and redirects.