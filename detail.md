# Technical Documentation: Enterprise Resource Planning (ERP) Portal

This document provides a comprehensive technical overview of the ERP Portal project, designed for AI context and developer reference.

---

## 1. Project Overview
The ERP Portal is a centralized college management system designed to streamline academic processes such as attendance, marks management, and resource sharing. It features Role-Based Access Control (RBAC) for three primary users: **Students**, **Faculty**, and **Admins (HOD)**.

---

## 2. Technology Stack
- **Frontend**: React.js, Tailwind CSS (Styling), Redux (State Management), React Router DOM (Navigation).
- **Backend**: Node.js, Express.js (REST API).
- **Database**: MongoDB with Mongoose (ODM).
- **Authentication**: JSON Web Tokens (JWT) with **stateless** sessions.
- **Security**: Passwords hashed with **bcryptjs**.
- **File Uploads**: **Multer** for local disk storage (stored in `/media` directory).
- **Communication**: Axios for API calls, Nodemailer for password reset emails.

---

## 3. Core Architecture & Logic

### 3.1 Authentication & RBAC
- **Login**: Separate controllers for Admin, Faculty, and Student login.
- **Middleware**: `auth.middleware.js` verifies the JWT from the `Authorization: Bearer <token>` header and attaches `userId` to the request.
- **Stateless**: The server does not store session state; all user identity info is in the JWT.

### 3.2 Database Models (Schemas)
- **StudentDetails**: Personal info, enrollment number, branch reference, semester, hashed password.
- **FacultyDetails**: Personal info, employee ID, department, salary, hashed password.
- **AdminDetails**: Full administrative controls, credentials.
- **Marks**: Links `studentId`, `subjectId`, `examId`, and stores `marksObtained`.
- **Subject**: Stores subject name and code.
- **Branch**: Stores branch/department name.
- **Exam**: Defines exam types (e.g., Internal 1, Semester) and total marks.
- **Material**: Stores educational resources (Notes, Syllabus) with file references.
- **Notice**: Stores announcements for specific audiences.
- **Timetable**: Links branches/semesters to schedule files.

---

## 4. Backend API Reference

### 4.1 Admin Routes (`/api/admin`)
- `POST /register`: Create new admin.
- `POST /login`: Admin authentication.
- `GET /my-details`: Get profile.
- `GET /`: Get all admins.
- `PATCH /:id`: Update admin info.
- `DELETE /:id`: Remove admin.

### 4.2 Student Routes (`/api/student`)
- `POST /login`: Student authentication.
- `GET /all`: Get all students (Admin only).
- `POST /register`: Create new student (Admin only).
- `PATCH /:id`: Update student record.
- `POST /search`: Advanced filtering by name/enrollment/branch/semester.

### 4.3 Faculty Routes (`/api/faculty`)
- `POST /login`: Faculty authentication.
- `GET /all`: Get all faculty members.
- `POST /register`: Register faculty (Admin only).

### 4.4 Academic Routes
- **Marks**: `GET /getMarks`, `POST /addMarks`, `POST /addBulkMarks`.
- **Material**: `GET /getMaterial`, `POST /addMaterial`, `DELETE /deleteMaterial/:id`.
- **Notice**: `GET /getNotice`, `POST /addNotice`.
- **Exam**: `GET /getExam`, `POST /addExam`.

---

## 5. Frontend Architecture

### 5.1 Directory Structure
- `src/Screens/Admin`: CRUD for Students, Faculty, Subjects, and Branches.
- `src/Screens/Faculty`: Upload marks, share materials, view student profiles.
- `src/Screens/Student`: View marks, download materials, view notices.
- `src/redux`: Redux slices for global user state management.
- `src/components`: Reusable UI elements (Navbar, Sidebar, Tables).

### 5.2 Key Features Implementation
- **Search Logic**: Uses regex on the backend to match names and strict equality for ID-based filters (Branch/Semester).
- **Password Reset**: Generates a short-lived JWT, sends a link via Nodemailer, and verifies the token before allowing a password update.
- **File Uploads**: Files are received by the backend via Multer, renamed with a timestamp, and the filename is stored in the database.

---

## 6. Setup & Deployment
- **Environment Variables**:
  - `MONGO_URL`: MongoDB connection string.
  - `JWT_SECRET`: Secret key for token signing.
  - `EMAIL_ID` / `EMAIL_PASS`: SMTP credentials for password resets.
- **Run Commands**:
  - Backend: `npm run dev` (starts on port 5000 by default).
  - Frontend: `npm start` (starts on port 3000).

---

## 7. Known Discrepancies (For Context)
- **PPT vs Code**: The PPT mentions **Cloudinary**, but the codebase uses **local Multer storage**.
- **PPT vs Code**: The PPT mentions a **PDF Export System**; the implementation relies on **browser print functionality** for reports.
