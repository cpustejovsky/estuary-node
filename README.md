# Estuary (WIP)
Where your streams of consciousness meet

- [Estuary (WIP)](#Estuary-WIP)
  - [3. Acknowledgments](#3-Acknowledgments)
  - [To-Dos](#To-Dos)
  - [Setup](#Setup)
  - [Acknowledgments](#Acknowledgments)
---
## To-Dos
* Finish adding CRUD functionality to Free Writes
  * Update
  * Destroy
* Add search and filter functionality for free writes
  * title search
  * content search
* Add CRUD functionality to User
* 

## Setup

* Have MongoDB Running
* Clone locally and cd into estuary
* Run `npm install`
* Set up and replace process.env.____ with:
  * a mongo database to connect to (you can uncomment the local one in app.js for something quick)
  * a secret for client-sessions
* Run `npm run start`
  * If you don't have nodemon installed globally and don't wish to, you can just run `node app.js`

## Acknowledgments 

* Colt Steele's [Web Development Bootcamp](https://www.udemy.com/the-web-developer-bootcamp/) was my launching off point for this application.
* Stephen Grider's [Complete Developer's Guide to MongoDB](https://www.udemy.com/the-complete-developers-guide-to-mongodb/) has also been extremely helpful in structuring the server logic of the app.