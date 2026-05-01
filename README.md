# 🔗 URL Shortener – Scalable System Design Project

A production-ready URL shortener built with a focus on **scalability, performance, and system design concepts**.
This project demonstrates real-world backend engineering practices including **caching, asynchronous processing, load balancing, and distributed systems thinking**.

---

## 🚀 Live Demo

* 🌐 Frontend: https://url-shortener-azure-iota-42.vercel.app
* ⚙️ Backend:  https://url-shortener-hbb2.onrender.com/you

---

## 🧠 Key Features

* 🔗 Generate short URLs from long URLs
* ✏️ Support for custom aliases
* ⚡ Fast redirects using Redis caching
* 📊 Click analytics tracking
* 🔁 Asynchronous processing using queues
* 🧱 Scalable architecture with load balancing

---

## 🏗️ System Architecture

```
Client (React - Vercel)
        ↓
Backend API (Node.js - Render)
        ↓
Redis (Caching + Queue)
        ↓
Worker (BullMQ)
        ↓
MongoDB (Persistence)
```

---

## ⚙️ Tech Stack

### 🖥️ Frontend

* React (Vite)
* CSS

### 🧠 Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB Atlas

### ⚡ Caching & Queue

* Redis (Redis Cloud)
* BullMQ

### 🌐 Deployment

* Frontend → Vercel
* Backend → Render

### 🧱 Infra (Local Simulation)

* NGINX (Load Balancer)
* Multiple Node.js instances

---

## 🔥 Core Concepts Implemented

### 1. URL Shortening Logic

* Unique short codes generated using Base62 encoding
* Optional custom alias support

---

### 2. Redis Caching (Performance Optimization)

* Frequently accessed URLs are cached in Redis
* Reduces database load
* Improves response time significantly

```js
const cached = await client.get(shortCode);
if (cached) return res.redirect(cached);
```

---

### 3. Asynchronous Processing (BullMQ + Redis)

* Click analytics handled via background worker
* Prevents blocking of main request thread

```js
await urlQueue.add("increment click", { shortCode });
```

---

### 4. Worker System

* Separate worker processes jobs from queue
* Updates click count in MongoDB

---

### 5. Load Balancing (Local Simulation)

* Implemented using NGINX
* Distributed traffic across multiple backend instances

```
NGINX → Node (3000, 3001, 3002)
```

---

### 6. Horizontal Scaling

* Backend designed to run multiple instances
* Stateless architecture ensures scalability

---

## 📁 Project Structure

```
url-shortener/
│
├── src/
│   ├── config/        # Redis & DB config
│   ├── controllers/   # Business logic
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   ├── queue/         # BullMQ queue & connection
│   ├── workers/       # Background workers
│   └── utils/         # Helper functions
│
├── url-shortener_frontend/
│   ├── src/
│   └── components/
│
├── infra/
│   └── nginx/         # Load balancer config
│
├── server.js
└── README.md
```

---

## 🔌 API Endpoints

### 🔗 Create Short URL

```
POST /shorten
```

**Body:**

```json
{
  "originalUrl": "https://example.com",
  "customAlias": "optional"
}
```

---

### 🔁 Redirect

```
GET /:shortCode
```

---

## ⚙️ Environment Variables

### Backend

```
PORT=3000
MONGO_URI=your_mongodb_url
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
SERVER_URL=https://your-backend-url
```

---

### Frontend

```
VITE_BACKEND_URL=https://your-backend-url
```

---

## 🧪 Running Locally

### 1. Clone repo

```
git clone <repo-url>
cd url-shortener
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Run backend

```
node server.js
```

---

### 4. Run frontend

```
cd url-shortener_frontend
npm install
npm run dev
```

---

## 🔄 Local Load Balancing Setup

To simulate scaling:

1. Run multiple backend instances on different ports
2. Use NGINX to distribute traffic

---

## 📈 Future Improvements

* User authentication
* Custom domain support
* Advanced analytics dashboard
* Rate limiting per user
* Expiring links

---

## 🎯 What This Project Demonstrates

* Real-world backend system design
* Understanding of distributed systems
* Practical use of Redis and queues
* Ability to build scalable systems
* Production deployment experience

---

## 🙌 Author

Tanmay

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
