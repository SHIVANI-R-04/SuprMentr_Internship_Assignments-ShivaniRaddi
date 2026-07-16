# 📘 MongoDB Schema Design – Blogging Platform

## 👨‍💻 Name: Sanjana V K

## 📅 Date: 30/03/2026

---

## 🧠 Introduction

This project presents a MongoDB schema design for a blogging platform. It includes core features like user management, blog posts, comments, and likes. MongoDB is used due to its flexibility and scalability in handling dynamic data.

---

## 📂 Collections Used

* 👤 Users
* 📝 Posts
* 💬 Comments
* 🏷️ Categories
* ❤️ Likes

---

## 👤 Users Schema

```json
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String,
  bio: String,
  createdAt: Date
}
```

---

## 📝 Posts Schema

```json
{
  _id: ObjectId,
  title: String,
  content: String,
  authorId: ObjectId,
  tags: [String],
  createdAt: Date,
  likesCount: Number
}
```

---

## 💬 Comments Schema

```json
{
  _id: ObjectId,
  postId: ObjectId,
  userId: ObjectId,
  content: String,
  createdAt: Date
}
```

---

## ❤️ Likes Schema

```json
{
  _id: ObjectId,
  userId: ObjectId,
  postId: ObjectId
}
```

---

## 🏷️ Categories Schema

```json
{
  _id: ObjectId,
  name: String
}
```

---

## 🔗 Relationships

* One user can create multiple posts
* One post can have multiple comments
* Users can like multiple posts
* Comments are linked to both users and posts

---

## 📊 Schema Diagram

```
Users ────▶ Posts ────▶ Comments
   │           │
   └────▶ Likes ◀────┘
```

---

## 📦 Sample Data

### Example User

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "bio": "Tech blogger"
}
```

### Example Post

```json
{
  "title": "Introduction to MongoDB",
  "tags": ["database", "nosql"]
}
```

---

## ⚙️ Design Decisions

* Used references instead of embedding for scalability
* Stored like counts in posts for faster performance
* Flexible schema design using MongoDB

---

## 🏁 Conclusion

This schema provides a scalable and efficient structure for a blogging platform. It supports essential features while maintaining performance and flexibility.

---

## ⭐ Bonus

> Designed as part of Data Modeler Assignment
> Demonstrates NoSQL schema design using MongoDB
