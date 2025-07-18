# Simple-Blogging-system

A RESTful backend API for a simple blogging platform built with **Node.js**, **Express**, and **MongoDB**.  


---

## Features

- User Registration & Login (JWT Auth)
- CRUD for Blog Posts
- Nested Comments (replies)
- Categories & Tags with Filtering
- Like / Dislike posts
- RESTful design
- Postman Collection included

---

## Folder Structure

```
Simple-Blogging-system/
├── app.js
├── .env
├── models/
├── routes/
├── utils/
├── middleware/
├── postman_collection/
```

---

## Environment Setup

Create a `.env` file in the root:

```
PORT=
MONGO_URI
JWT_SECRET


Install dependencies:

```bash
npm install
```

Start the server:

```bash
node app.js
```



## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs
- jsonwebtoken
- dotenv

---


