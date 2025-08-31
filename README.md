# 📝 Notes App

A secure and feature-rich **Notes Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)**.
The app allows users to create, edit, and manage notes with enhanced authentication mechanisms:

* **OTP-based Authentication** (Email OTP for login/registration)
* **Google Sign-In** integration using OAuth 2.0
* Secure session management and JWT authentication

---

## 🚀 Features

* 🔐 **User Authentication**

  * Sign up and login via **Email + OTP verification**
  * **Google Sign-In** using OAuth 2.0

* 📝 **Notes Management**

  * Create, read, update, and delete notes
  * Organized UI for better usability

* 🔒 **Security**

  * OTP verification with expiry
  * Encrypted password storage
  * JWT-based session management

* 🌐 **Modern Tech Stack**

  * Frontend: **React + TailwindCSS**
  * Backend: **Node.js + Express.js**
  * Database: **MongoDB (Mongoose ODM)**
  * Authentication: **JWT, Google OAuth 2.0**

---

## 📂 Project Structure

```
notes-app/
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # Application Pages (Login, Notes, etc.)
│   │   ├── utils/          # Helper Functions
│   │   └── App.js
│   └── package.json
│
├── server/                 # Express Backend
│   ├── config/             # DB & OAuth Configurations
│   ├── controllers/        # Route Controllers
│   ├── models/             # MongoDB Models (User, Notes)
│   ├── routes/             # API Routes
│   ├── utils/              # OTP + JWT Utility Functions
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
```

### 2️⃣ Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the **server/** directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## ▶️ Running the Application

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm start
```

The app should now be running at:
👉 **Frontend**: `http://localhost:3000`
👉 **Backend**: `http://localhost:5000`

---

## 🔑 Authentication Flow

1. **Email + OTP Authentication**

   * User enters email
   * Receives OTP via email (valid for a few minutes)
   * Enter OTP to complete login/signup

2. **Google Sign-In**

   * Secure OAuth 2.0 flow via Google
   * Retrieves user profile & email for authentication

---

## 📌 Tech Stack

* **Frontend:** React, TailwindCSS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Authentication:** JWT, Google OAuth 2.0, Nodemailer (for OTP)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your fork & create a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

