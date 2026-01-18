# Prisma Blog Application

A simple role-based blog platform using Prisma ORM and PostgreSQL.

## Features
- Email/Password & Google OAuth authentication
- Role-Based Access Control (User, Admin)
- Create, update, delete blog posts
- Comment system with admin moderation

## Roles
- Visitor: View posts
- User: Manage own posts, comment
- Admin: Manage all posts, moderate comments

<div align="center">
  <img src="https://i.ibb.co.com/PzJKrX1m/blog.png" alt="coding" width="400" />
</div>

## Architecture
Client → API → Auth → Prisma → PostgreSQL

## Tech Stack
- Node.js / Next.js
- Prisma ORM
- PostgreSQL

## License
Educational project
