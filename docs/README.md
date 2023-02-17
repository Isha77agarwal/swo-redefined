[# SWO Portal Redefined

Improved web portal for the Student Welfare Office, MNNIT Allhabad.

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/) (version 18.12.1 LTS preferred)
- [NPM](https://www.npmjs.com) or [Yarn](https://yarnpkg.com) package managers.
- [Docker](https://www.docker.com) for database or a local copy of [MariaDB](https://mariadb.org/download/) or [MySQL](https://www.mysql.com/downloads/)
- IDE like [Visual Studio Code](https://code.visualstudio.com/download) or [JetBrains](https://www.jetbrains.com/webstorm/download/)

### Optional Proxy Setting
- If you have to use proxy you need to configure your IDE, Docker, git and terminal to use proxy.
- [Proxy Setup in VSCode](https://code.visualstudio.com/docs/setup/network#_proxy-server-support)
- [Intellij Proxy Setup](https://www.jetbrains.com/help/idea/settings-http-proxy.html)
- [Docker Proxy Setup](https://docs.docker.com/network/proxy/)
- [Git Proxy Setup](https://gist.github.com/evantoli/f8c23a37eb3558ab8765)
- Search for your OS to set up proxy in terminal.

### Setting up the project

- Clone the project from the repository 
  ```
  https://github.com/DeanStudentWelfare-MNNIT/swo-redefined.git
  ```
  
- Install the necessary dependencies:
  ```
  yarn install
  ``` 
  or
  ```
  npm install
  ```

- (Optional) Installation with docker:
  - Install Docker.
  - Run ```docker-compose up``` from the terminal in the project directory.

- Create a `.env` file in the root folder (where server.ts resides) and add the following properties in it:
  ```shell
    PORT=3001
    DATABASE_URL="mysql://root:TestEnv%40123@localhost:3306/swo-v1?connection_limit=5"
    MYSQL_ROOT_PASSWORD=TestEnv@123
    SESSION_SECRET=TestSessionSecret@123
    ENVIRONMENT=TEST
  ```
  
  **If you are running docker this .env should suffice however if you have a local copy of the database 
   you need to change DATABASE_URL and MYSQL_ROOT_PASSWORD as required**
- Run the following command to set up your database and tables.
  ```shell
  prisma migrate dev
  ```
- Run the following command to run the application.
  ```shell
  yarn start-dev
  ```
  or
  ```shell
  npm run start-dev
  ```

## Documentation

[Docsify.js](https://docsify.js.org) is used to create documentation for the website. It is hosted on
GitHub pages and can be browsed [here]()

To run a local copy of the database you will need to install docsify using the command
```shell
yarn global add docsify-cli
```
or 
```shell
npm install docsify-cli -g
```

After installing, run the following command to start the documentation server.
```shell
docsify serve ./docs
```

## Contributing

- Follow the installation steps.
- Clone the `dev` repository or your team repository and create and checkout a new branch. Use combination of issue name and your name to create a new branch.
```shell
git checkout -b [branch name]
```
- Make your changes and push the changes to GitHub.
```shell
git push origin [branch name]
```
- Create pull request from GitHub.]()