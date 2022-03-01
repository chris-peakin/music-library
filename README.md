# :notes: Music Library API - Manchester Codes - Chris Peakin - Oct 2021 Cohort :notes:

## Introduction

This is a simple API designed to create a library of music artists and albums. This has been made as a project as part of the Backend module of the Manchester Codes Software Engineer fast-track course.

## Installation

Firstly, it would be best if you had Docker Desktop and MySQLWorkbench installed if you haven't already. Docker will allow you to run the container and use the command line to interact with the database. MySQLWorkbench will allow you to query the database without the command line. Postman is also needed as it will allow you to interact with the API.

Obviously, the contents of node_modules won't be included when you clone the repo, but you can install the dependencies and dev_dependencies with the following in the terminal:

`npm install`

In the command line, we also want to pull the Database Docker Image Northwind to make our container. We then want create the container using that image. The below assume we are using an M1 Mac, so `:m1` can be removed if you're not using an M1 Mac.

`docker pull mcrcodes/northwind`

`docker build -f ./M1/Dockerfile . -t mcrcodes/northwind:m1`

`docker run -d -p 3307:3306 --name northwind -e MYSQL_ROOT_PASSWORD=password mcrcodes/northwind:m1`

Note that the port `3307` and the password `MYSQL_ROOT_PASSWORD=password` can be changed if you like; the above are used as an example.

You can then use MySQLWorkbench to connect to the database using the following credentials (using the above example):

> Username: User

> Port: 3307

> Password: password

## Links
### Software to download

Docker: https://docs.docker.com/get-docker/

MySQLWorkbench: https://www.mysql.com/products/workbench/

Postman: https://www.postman.com/

### Dependencies

MySQL2: https://www.npmjs.com/package/mysql2

Express: https://expressjs.com/

### Development Dependencies

Chai: https://www.chaijs.com/guide/

Dotenv: https://www.npmjs.com/package/dotenv

ESLint: https://eslint.org/

Mocha: https://mochajs.org/

Nodemon: https://www.npmjs.com/package/nodemon

Supertest: https://www.npmjs.com/package/supertest