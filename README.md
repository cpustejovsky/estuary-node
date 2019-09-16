# Estuary (WIP)
Where your streams of consciousness meet

- [Estuary (WIP)](#estuary-wip)
  - [To-Dos](#to-dos)
  - [Setup](#setup)
  - [Acknowledgments](#acknowledgments)

---
## To-Dos
* ~~Email and/or text user with notes~~
* ~~Add CRUD functionality to User~~
  * ~~Update~~
  * ~~Destroy~~
* Email password reset
  * Set up nodemailer with MailGun
  * Implement JWTs for password reset
* Add search and filter functionality for free writes and notes
  * Use mongoose to search through array of freeWrites and Notes and look for any match in content or title;
  * Update view with app.
* Add sufficient unit testing
  * ~~Add Mocha testing framework to app~~
  * Look at NestJS for inspiriation on testing structure
  * Complete unit testing coverage
* Replace EJS with React for Front-End functionality
* Increase Efficiency
  * Add logging and benchmarking
* Turn Estuary in Electron App
* Determine next steps _____
  
## Setup

* Have MongoDB Running
* Clone locally and cd into estuary
* Run `npm install`
* Set up and replace process.env.____ with:
  * a mongo database to connect to (you can uncomment the local one in app.js for something quick)
  * a secret for client-sessions
  * email address credentials for nodemailer
    * email and password
* Run `npm run local`
  * If you don't have nodemon installed globally and don't wish to, you can just run `node app.js test`

## Acknowledgments 

* Colt Steele's [Web Development Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/) was my launching off point for this application.
* Stephen Grider's [Complete Developer's Guide to MongoDB](https://www.udemy.com/the-complete-developers-guide-to-mongodb/) has also been extremely helpful in structuring the server logic of the app.
* Finally, Tony Alicea's works on JavaScript and NodeJS provide an invaluable baseline for understanding the technologies I'm using.