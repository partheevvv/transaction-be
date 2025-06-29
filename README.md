# Transactions API

This is a Node.js REST API for managing user accounts, financial transactions, and viewing monthly summaries. It uses Express, MongoDB, Mongoose, JWT for authentication, and follows modern security practices.

---

## 🛠️ Technologies Used

- **Node.js** + **Express** – Backend API
- **MongoDB** + **Mongoose** – Database
- **JWT** – Authentication
- **bcrypt** – Password hashing
- **Helmet**, **CORS**, **express-validator** – Security

---

## 📦 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/partheevvv/transaction-be.git
cd transaction-be

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server
node index.js
```

---

## 📁 Environment Variables

Create a `.env` file in the root and configure:
```env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

---

## 🚀 API Endpoints

### 🔐 Auth

#### ✅ Register
`POST /api/auth/register`
```json
{
  "name": "Parthiv",
  "email": "parthiv@example.com",
  "password": "yourpassword"
}
```
**Response:**
```json
{ "token": "JWT_TOKEN_HERE" }
```

#### ✅ Login
`POST /api/auth/login`
```json
{
  "email": "parthiv@example.com",
  "password": "yourpassword"
}
```
**Response:**
```json
{ "token": "JWT_TOKEN_HERE" }
```

> Use this token in all protected routes as:
```
Authorization: Bearer <JWT_TOKEN_HERE>
```

---

### 💰 Transactions (Protected)

#### 📤 Create Transaction
`POST /api/transactions`
```json
{
  "date": "2025-06-01",
  "description": "Freelance Work",
  "amount": 5000,
  "category": "Income",
  "type": "Income"
}
```

#### 📥 Get All Transactions
`GET /api/transactions`
**Header:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "...",
    "date": "2025-06-01",
    "description": "Freelance Work",
    "amount": 5000,
    "type": "Income",
    "category": "Income"
  },
  ...
]
```

---

### 📊 Summary Dashboard (Protected)

#### 📈 Get Monthly Summary
`GET /api/summary?month=6&year=2025`
**Header:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "balance": 3500,
  "totalIncome": 5000,
  "totalExpense": 1500,
  "recentTransactions": [
    { "description": "Groceries", "amount": 1500, ... },
    { "description": "Freelance Work", "amount": 5000, ... },
    ...
  ]
}
```
---
