# MERN Stack Authentication App

This project is a full-featured authentication system built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It supports essential features such as user signup, email verification, login, logout, password reset, and a simple dashboard to display user details.

## Features

- **User Registration (Signup)**: Create an account with a unique email and password.
- **Email Verification**: Verify email addresses through a verification Token sent via email.
- **Login/Logout**: Secure login and logout functionality.
- **Forgot Password**: Request a password reset link via email.
- **Password Reset**: Reset the password through a secure link.
- **User Dashboard**: View basic user details on a simple dashboard.
- **Email Notifications**: Receive emails for account verification and password resets.

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js and Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: MailTrap
- **Styles**: Tailwind CSS

---

## Installation and Setup

### Prerequisites

- Node.js (v14+)
- MongoDB
- An email service (for sending verification and reset emails)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-auth-app.git
cd mern-auth-app
```

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-auth-app.git
cd mern-auth-app
```

### 2. Install dependencies

- Backend

```bash
cd .
npm install
```

- Frontend

```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

- Backend .env

```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:3000
```

### 4. Run the Application

- Start the Backend Server

```bash
cd .
npm run dev
```

- Start the Frontend Server

```bash
cd frontend
npm start
```

## API Endpoints

### Auth Routes (`/api/auth`)

- **POST `/signup`**: Register a new user and send a verification email.
- **POST `/verify-email`**: Verify a user's email address.
- **POST `/login`**: Authenticate the user and return a JWT.
- **POST `/forgot-password`**: Send a password reset email.
- **POST `/reset-password`**: Reset the user's password.
- **POST `/logout`**: Invalidate the user's session.

---

## Key Functionality

### 1. **Email Verification:**

- Users receive a verification Token after signup.
- Copy the Token and add it to input fields to verify your email

### 2. **Password Reset Flow:**

- Users request a reset link if they forget their password.
- After receiving the email, they can reset their password securely.

### 3. **User Dashboard:**

- After logging in, users can access their dashboard to view profile details.

---

## Customization

### **Email Service:**

- Replace Nodemailer with services like SendGrid for better scalability.

### **UI Enhancements:**

- Use Tailwind CSS or Material-UI for improved design.

---

## Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change or add.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For questions or support, please reach out via Ahmed.m.yassin14@gmail.com or create an issue in this repository.

---

Happy coding! 🚀
