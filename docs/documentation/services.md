# Services

Services contain the core application logic of the system. Routers are responsible for calling the various functions of
the
services. The services are responsible for getting data from the databases using repositories, using the retrieved data
to create entities, performing operations on the entities and then returning that data to the calling router function.

## Services Design Pattern

Services should be declared as a `class` and this class should be exported from the file. This allows for custom
implementations by extending them. The repositories used by the service should be either injected using constructor
or setter methods.

> Repository injection through constructor or setter is important for unit testing of the service using mocks.

The file should also provide a default implementation of the service class it exports.