# OBS

# MERN Book Management System

This is a MERN (MongoDB, Express, React, Node.js) application for managing a book inventory. 

## Getting Started
### Prerequisites
- Node.js
- MongoDB

### Installation
 Clone the repository:
 ```
 cd OBS
 cd server
 npm install
 node server.js
 cd ..
 cd client
 npm install
 npm start
```


This will start both the backend server and the frontend development.

## Features

### Users
- user model with feilds name,gender,email,password.
- Backend routes for register and login the user.
- Frontend user is Authenticated using the backend.

### Books
- Book model with fields: bookId, bookName, author, level (1-6), genre, quantity, location
- Backend routes for viewing all books, adding a new book, deleting a book, and updating the level of a book
- Frontend books component that displays all books in a table format and allows for CRUD operations
- Create book page that allows users to add a new book to the database

### Student

#### backend
- Checking out a book for a student
- Removing a book from a student's current check-in list
- Updating a student's level (when they read 3 books of their current level or higher)
- Searching for books to check in
#### frontend
- Displaying all students with their details (id, name, level, current check-in, history of check-outs)
- Checking in a book for a student (decreases the book's quantity by 1)
- Checking out a book for a student (removes the book from the student's current check-in list, adds it to their history, and increases the book's quantity by 1)
- Removing a book from a student's current check-in list (increases the book's quantity by 1)
- Updating a student's level (when they read 3 books of their current level or higher)


## Technologies Used
Frontend: React.js, Axios, React Router DOM
Backend: Node.js, Express.js, MongoDB
Deployment: Localhost (for development)
