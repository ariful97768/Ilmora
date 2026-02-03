# Ilmora - University Management System

A comprehensive full-stack university management system built with modern web technologies. Ilmora provides role-based access control for administrators, faculties, and students with features designed to streamline academic operations and communication.

## Overview

Ilmora is a complete university management platform that enables seamless interaction between students, faculties, and administrators. The system facilitates class management, real-time communication, academic fee payments, and comprehensive administrative oversight.

## Key Features

### Student Features

- **User Profile**: Manage personal information and academic details
- **Class Schedule**: View enrolled classes and course schedules (In Development)
- **Real-time Chat**: Direct messaging with peers and faculties (In Development)
- **Group Chat**: Participate in department group discussions (In Development)
- **Academic Fee Payment**: Secure online payment system for tuition and fees (In Development)
- **Announcements**: Stay updated with school-wide and class-specific announcements (In Development)

### Teacher Features

- **Class Management**: Create and manage classes (In Development)
- **Automatic Group Leadership**: Automatically designated as group chat leader for their department (In Development)
- **Attendance Tracking**: Monitor and record student attendance (In Development)
- **Student Interaction**: Direct communication with students through chat (In Development)
- **Announcement Broadcasting**: Share important updates with students (In Development)

### Admin Features

- **User Management**: Add, modify, and terminate teacher and student accounts (In Development)
- **Class Management**: Create, update, and delete classes with full control (In Development)
- **Dashboard**: Comprehensive overview of system activities and statistics (In Development)
- **Student Status Updates**: Modify student status for scholarship or free study eligibility (In Development)
- **Announcement Management**: Post system-wide announcements (In Development)
- **Academic Fee Management**: Monitor payment status and financial records (In Development)

## Technology Stack

### Frontend

- **Framework**: Next.js
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form
- **Real-time Communication**: Socket.io

### Backend

- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: MongoDB
- **Email Service**: Nodemailer

### Authentication & Security

- **Authentication**: NextAuth.js
- **OAuth Providers**: Google, Facebook and Github via NextAuth
- **Role-Based Access Control**: Custom role management system

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance (local or cloud)
- Environment variables setup

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/ariful97768/Ilmora.git
   cd Ilmora
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory with the following variables:

   ```
   AUTH_SECRET="your_generated_secret"
   AUTH_TRUST_HOST=TRUE
   AUTH_GOOGLE_ID="your_google_oauth_id"
   AUTH_GOOGLE_SECRET="your_google_oauth_secret"
   AUTH_FACEBOOK_ID="your_facebook_oauth_id"
   AUTH_FACEBOOK_SECRET="your_facebook_oauth_secret"
   MONGODB_URI="your_mongodb_connection_string"
   SMTP_USER="your_email@gmail.com"
   SMTP_PASS="your_app_password"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ilmora/
├── .env.local                # Environment variables (not in repo)
├── src/app/                  # Next.js app directory
    │   ├── api/              # API routes and authentication
    │   ├── (auth)/           # Authentication pages
    │   ├── (dashboard)/      # Authenticated dashboard routes
    │   └── layout.tsx        # Root layout
    ├── components/           # Reusable React components
    ├── lib/                  # Utility functions and helpers
    ├── public/               # Static assets
    ├── database/             # MongoDB Database config
    ├── assets/               # Resource images and fonts
    └── auth.ts               # Auth.js config (NextAuth v5)
```
