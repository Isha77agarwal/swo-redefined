# Services

Services contain the core business logic of the system. Routers are responsible for calling the various functions of the
services. The services are responsible for getting data from the databases using repositories, performing calculation on
that data and then returning that data to the calling router function.

## Services Design Pattern

Services should be declared as a `class` and this class should be exported from the file. This allows for custom
implementations by extending them. The repositories used by the service should be either injected using constructor
or setter methods. 

> Repository injection through constructor or setter is important for unit testing of the service.