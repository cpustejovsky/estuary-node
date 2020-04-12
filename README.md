# Estuary (WIP)
Where your streams of consciousness meet

- [Estuary (WIP)](#estuary-wip)
  - [Inspiration](#inspiration)
  - [To-Dos](#to-dos)
  - [Setup](#setup)
  - [Acknowledgments](#acknowledgments)

---
## Inspiration
Thanksgiving weekend 2019, I started reading 
[**Getting Things Done**](https://www.amazon.com/Getting-Things-Done-Stress-Free-Productivity/dp/0143126563) by David Allen.
During my plane rides, I had the idea to turn this into an app that could facilitate the GTD process.

That would have the dual benefit of cementing these practices for me 
and also building a robust app that I can proudly show off in my portfolio.

## To-Dos
* ~~Email and/or text user with notes~~
* ~~Add CRUD functionality to User~~
  * ~~Update~~
  * ~~Destroy~~
* ~~Add Mocha testing framework to app~~
* ~~Remove document upload feature~~
* Replace EJS with React on Front-End
* Authorize users through Google API instead of username and password
* Clean up note selector function
* Add avatar image to user profiles
* Be able to add multiple notes at a time
* Add Next Actions List
* Set priority for notes
* Add customizable tags for notes
* Connect to Google Calendars via API
* Add sufficient unit testing
* Complete unit testing coverage
* Refactor in TypeScript
* Add search and filter functionality
* Add functionality to email notes to app
* Create a system to file general reference items (potentially connect with Toby)
* Hook up next action steps to to-dos in Habitica ([Habitica API](https://habitica.com/apidoc/))
* Turn Estuary in Electron App

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
