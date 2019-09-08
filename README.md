# Estuary (WIP)
Where your streams of consciousness meet

- [Estuary (WIP)](#estuary-wip)
  - [- Acknowledgments](#acknowledgments)
  - [To-Dos](#to-dos)
  - [Setup](#setup)
  - [Acknowledgments](#acknowledgments)
---
## To-Dos
* Add search and filter functionality for free writes
  * title search
  * content search
* Add CRUD functionality to User
* Email password reset
* Add Mocha testing framework
* Replace EJS with React for Front-End functionality
* Email and/or text user with notes
* Increase Efficiency
  * Add logging and benchmarking
  * Determine next steps _____
  
## Setup

* Have MongoDB Running
* Clone locally and cd into estuary
* Run `npm install`
* Set up and replace process.env.____ with:
  * a mongo database to connect to (you can uncomment the local one in app.js for something quick)
  * a secret for client-sessions
  * email address credentials for nodemailer
* Run `npm run local`
  * If you don't have nodemon installed globally and don't wish to, you can just run `node app.js`

## Acknowledgments 

* Colt Steele's [Web Development Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/) was my launching off point for this application.
* Stephen Grider's [Complete Developer's Guide to MongoDB](https://www.udemy.com/the-complete-developers-guide-to-mongodb/) has also been extremely helpful in structuring the server logic of the app.
