# :notes: Music Library API - Manchester Codes - Chris Peakin - Oct 2021 Cohort :notes:

## Introduction

This is a simple API designed to create a library of music artists and albums. This has been made as a project as part of the Backend module of the Manchester Codes Software Engineer fast-track course.

## Installation

Firstly, it would be best if you had Docker Desktop and MySQLWorkbench installed if you haven't already. Docker will allow you to run the container and use the command line to interact with the database. MySQLWorkbench will allow you to query the database without the command line. Postman is also needed as it will allow you to interact with the API.

Obviously, the contents of node_modules won't be included when you clone the repo, but you can install the dependencies and dev_dependencies with the following in the terminal:

`npm install`

In the command line, we also want to pull the Database Docker Image Northwind to make our container. We then want create the container using that image. The below assume we are using an M1 Mac, so `:m1` should be removed if you're not using an M1 Mac.

`docker pull mcrcodes/northwind`

`docker build -f ./M1/Dockerfile . -t mcrcodes/northwind:m1`

`docker run -d -p 3307:3306 --name northwind -e MYSQL_ROOT_PASSWORD=password mcrcodes/northwind:m1`

Note that the port `3307` and the password `MYSQL_ROOT_PASSWORD=password` can be changed if you like; the above are used as an example.

You can then use MySQLWorkbench to connect to the database using the following credentials (using the above example):

> Username: User

> Port: 3307 (or whichever port you've written)

> Password: password (or which password you've written)

Because the code uses `dotenv`, we need to create two files: `.env` and `.env.test`; these aren't committed to GitHub. These should contain the following: 

 `DB_PASSWORD=password` (or what your choice of password is)

 `DB_NAME=music_library_dev` in .env; `DB_NAME=music_library_test` in .env.test.

 `DB_USER=user`

 `DB_HOST=localhost`

 `DB_PORT=3307` (or what your choice of port is)

 `PORT=3000`

Make sure the container is running before attempting to interact with the database or run the included tests.

## Testing

This repo also includes some basic CRUD (create, read, update, delete) tests for both artists and albums. At this stage, when an album is created, it is linked to its respective artist, so an artist needs to exist before an album can be assigned to that artist. The tests can be run by running the following in the terminal:

`npm test`

To put it simply, without going into too much detail about the relationships between tables: the albums know which artist they are assigned to, but the artists don't know what their albums are.

If you want, you can take a look at the tests in the tests folder and add to them, but the current tests cover the rudimentary operations that we would typically like to do with the tables.

The code is setup in a way that a test database and test tables are created to perform the tests and then deleted when the tests are finished.

## Using the Database

We need to enter `npm start` in our terminal in order to:

1. Create the database, the artist and album tables if they don't already exist. They won't be created again if they already exist.
2. `GET`, `POST`, `PATCH` or `DELETE` requests using Postman.
3. Make changes to the database using Node (ie. in the terminal).

### Using MySQLWorkbench

The syntax used by MySQLWorkbench is very simple to follow, and a link to the official documentation is provided below in the Links section. The test files also provide examples of commands that can be fed into a MySQLWorkbench query to manipulate the database. 

Creating an artist:

`INSERT INTO Artist (name, genre) VALUES ('Biffy Clyro', 'alternative')`

`INSERT INTO Artist (name, genre) VALUES ('Within Temptation', 'metal')`

Finding an artist by its ID:

`SELECT * FROM Artist WHERE id = ?` (where ? is the artist's id number, which increases incrementally with each new artist added)

Deleting an artist by its ID:

`DELETE FROM Artist WHERE id = ?`

### Using Postman

`npm start` needs to have been run and Node needs to be running for Postman to be used to interact with the database.

The App will listen on port 3000 by default by the code, but this can be changed if desired.

As illustrated by the test files, `GET` requests are good for reading all artists/albums or an artist/album by its ID. `POST` requests can be used to create artists/albums. `PATCH` requests can be used to update artists/albums based on their ID. `DELETE` requests can be used to delete artists/albums based on their ID.

If the ID is not required, `http://localhost:3000/artist` is where you send your request using Postman, and if it IS required `http://localhost:3000/artist/:artistid` where `:artistid` is the desired artist ID.

## Links
### Software to download

Docker: https://docs.docker.com/get-docker/

MySQLWorkbench: https://www.mysql.com/products/workbench/

Postman: https://www.postman.com/

### MySQLWorkbench Syntax

MySQLWorkbench Syntax: https://dev.mysql.com/doc/refman/8.0/en/dynindex-statement.html

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