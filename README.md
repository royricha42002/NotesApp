
# NOTESWORLD - Note Taking MERN stack project

This project is a full-stack application for taking and managing notes. It includes a frontend built with React and a backend using Node.js, Express, and MongoDB. The application allows users to sign up, log in, and manage their notes through a user-friendly interface.



## DEMO

https://www.kapwing.com/videos/666fcff21fe63070a7587a9a

## TABLE OF CONTENT

- Features
- Tech Stack
- Installation
 - Usage
- API Endpoints
- Contributing
- License

## FEATURES

- Fully responsive design
- Home route displaying the main page
- User authentication (sign up and log in)
- Create, read, update, and delete notes
 - User-specific notes management


## Tech Stack


**Frontend:** React, React Router, TailwindCSS

**Backend:** Node.js, Express

**Database:** MongoDB, Mongoose

**Authentication:** bcrypt

**Environment Variables:** dotenv

**CORS Handling:** cors


## Installation

**PREREQUISITES**

- Node.js and npm installed
-  MongoDB installed and running

**CLONE THE REPOSITORY**

```bash
  git clone https://github.com/royricha42002/NotesApp
  cd notesapp
```

**BACKEND SETUP**

1. Navigate to the backend directory and install dependencies:

```bash
  cd backend
  npm install
```
    

2. Create a .env file in the backend directory and add the following
```makefile
  PORT=8000
  MONGO_LOCALHOST=mongodb://localhost:27017/notesapp
  UI_PORT=5173
```

**FRONTEND SETUP**

```bash
  cd frontend
  cd notes_app
  npm install
```


## USAGE

1. Start the backend server:

```bash
  cd backend
  npm start
```

2. Start the frontend development server:

```bash
  cd ../frontend/notes_app

  npm start
```








## HOW TO RUN

- Compile the project using javac and jar commands.
- Run the game using java command:
```bash
java -jar game.jar
```
- Use the arrow keys to move the player left and right.

## API ENDPOINTS

**User Endpoints**
-

- **POST /signup**: Register a new user.
- **POST /login**: Log in a user.
- **GET /getUsers**: Retrieve all users.
- **GET /getUsers/** : Retrieve a specific user by user ID.

**Notes Endpoints**
-

- **GET /notes/** : Retrieve all notes for a specific user.
- **POST /notes**: Add a new note (requires user-id header).
- **PUT /notes/**: Update a specific note by ID.
- **DELETE /notes/**: Delete a specific note by ID.
## CONTRIBUTING


Contributions are welcome! 

Please fork the repository and submit a pull request for any improvements or bug fixes.


## LICENSE

This project is licensed under the MIT License. See the LICENSE file for details.

