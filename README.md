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

## Architecture
Client → API → Auth → Prisma → PostgreSQL

## Tech Stack
- Node.js / Next.js
- Prisma ORM
- PostgreSQL

## License
Educational project
