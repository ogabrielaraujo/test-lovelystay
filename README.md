# LovelyStay CLI

In this project I used some clean architecture concepts to separate responsibilities

Domain => used for type definitions
Repository => database connections and operations
service => business rules and application flow
Util => more generic application helper functions
Migration => Run the database queries to create tables

### Notes

- I separated github as a gateway, maybe it's better to abstract it in other ways, but in the future it would be easier to add another providers.
- I mocked the database, I don't know if it was the best approach as I've never used pg-promise, but from my tests it worked correctly. Same here for migrations.
- in this repository you can see the branches that I created during the development of the project.
- The project is simple, and maybe i overengineered, but I used the patterns in order to demonstrate knowledge and my process of development.
- As suggested on email, I changed the escape vars to named params, It looks easier to maintain (as doc: https://github.com/vitaly-t/pg-promise#query-formatting)

### TO-DO:

- [x] Init environment with yarn and docker
- [x] Code standards
- [x] Configure typescript
- [x] Project basement
  - [x] Folder structure
  - [x] Install deps for cli
- [x] CLI
  - [x] Navigation menu
  - [x] Fetch information from github users (name and location)
  - [x] Store user infos on postgres using pg-promise
  - [x] Fetch all saved users on database (findAll)
  - [x] Search users by location
  - [x] Look for users programming languages and save
  - [x] Check if user already exists
  - [x] Search users by programming languages
- [x] Tests
- [x] Refactor
- [x] Review
- [x] README
