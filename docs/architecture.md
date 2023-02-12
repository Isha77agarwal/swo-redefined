# Architecture

The project follows the layered architecture principle in which a layer talks with only the layers directly above
and below it. The flow of data and information can be bidirectional but only through layers above or below the given
layer.
The project is divided into three layers:

- User Interface Layer
- Application Layer / Business Logic Layer
- Database Access Layer

## User Interface Layer

The user interface layer consists of the express routers defined in the `routes` folder and
the `ejs` files present in the `ui` folder.

The UI layer can be divided into two sub-layers:

- **View layer**: consists of HTML, EJS, CSS and client side JS which render web pages and UI elements to the user.
- **Controller layer**: consists of routers which control how users interact with the server.

#### **View layer**

It has the responsibility to render proper web pages and web components to the user. It also has the responsibility
to pass the data from the frontend to the backend.

#### **Controller layer**

It has the responsibility to take user HTTP request and return an appropriate HTTP response. To do so it calls
the appropriate service methods.

## Application Layer / Business Logic Layer

The application layer contains all the application logic associated with the project.
It consists of classes present in the `services` folder. Services may or may not interact with repositories however
if they do they must use public constructors to initialize the repositories for dependency injection during testing.

### Entities

Entities are domain object that contain domain business logic. They represent the business side of the things and are
stored in database. Separation of application logic and business logic is required.

> Entities should not contain dependencies to other components.

## Database Access Layer

The database access layer lies in the `repository` folder. It contains interfaces that provide
methods that use `prisma client` functions to access the database. It should return `promises` so that
services can wait on multiple database access calls.