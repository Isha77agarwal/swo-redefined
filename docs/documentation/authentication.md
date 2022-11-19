# Authentication

!> This page is not complete and requires further modifications.

Authentication includes the following tasks:
- Login to accounts.
- Logout of accounts.
- Reset passwords.

## Login

Login has two permissible request methods: **GET** and **POST**.

It requires a _role_ path parameter which should be either _student_ or _department_.

- **GET** on `/users/login/:role`.
- **POST** on `/users/login/:role`.

#### UI Layer

- **GET**
  - Render the login forms.
- **POST**
  - Extract _role_ from the url parameter and _username_ and _password_ from the request body.
  - Call _loginStudent_ or _loginDepartment_ methods passing _username_ and _password_ as parameters 
    from `UserService` class based on the role passed.
  - If no error is thrown, set session and redirect.
  - If error is thrown, then send the appropriate status code depending on the error.

!> If you want to store something in the session while the user has logged in see [Sessions]()

#### Application Layer

- **POST**
  - _loginStudent_ or _loginDepartment_ is called by the router.
  - Both functions get student or admin records using `UserRepository` interface methods _getAdminByUsername_ 
    and _getStudentByUsername_.
  - The passwords are hashed and stored along with salt.
  - The password provided from UI layer is hashed with the salt retrieved from `UserRepository` and equated with 
    the stored hashed password from database.
  - If the hashes are not equal then error is thrown.