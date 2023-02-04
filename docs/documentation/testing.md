# Testing

Testing is used to check the correctness of the code at various architectural levels.
Testing also helps check for ripple effect along the codebase in case of updates and bug fixes.

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

## Testing Services

