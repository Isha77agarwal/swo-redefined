# Architecture

The project is divided into three layers:

- User Interface Layer
- Application Layer / Business Logic Layer
- Database Access Layer


## User Interface Layer

The user interface layer consists of the express routers defined in the `routes` folder and 
the `ejs` files present in the `ui` folder. 

It has the responsibility to take user HTTP request and return an appropriate HTTP response. To do so it calls 
the appropriate service methods.

## Application Layer / Business Logic Layer

The application layer contains all the business logic associated with the project.
It consists of classes present in the `services` folder. Services may or may not interact with repositories however
if they do they must use public constructors to initialize the repositories for dependency injection during testing.

## Database Access Layer

The database access layer lies in the `repository` folder. It contains interfaces that provide
methods that use `prisma client` functions to access the database. It should return `promises` so that 
services can wait on multiple database access calls.