📌 Product CRUD App
Full-stack Product Management CRUD Application using Node.js + Express + MongoDB (Backend) and React.js (Frontend).

🚀 Project Overview

Yeh project ek complete CRUD system provide karta hai jisme:

🖥 Backend (Node + Express + MongoDB)

💻 Frontend (React.js)

📂 Image Uploading (Multer)

🔐 Middleware for validation/error handling

🔄 Connected API between frontend & backend

📁 Folder Structure
root/
│── controllers/
│── middleware/
│── models/
│── routes/
│── uploads/
│── product-frontend/   ← React Frontend
│── index.js            ← Main server file
│── .env
│── package.json

🛠️ Backend Setup
1️⃣ Install Dependencies
npm install

2️⃣ Add Environment Variables

.env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string

3️⃣ Start Backend Server
npm run dev

or

node index.js

📡 API Endpoints
➕ Create Product

POST /api/products

📄 Get All Products

GET /api/products

📄 Get Single Product

GET /api/products/:id

✏️ Update Product

PUT /api/products/:id

❌ Delete Product

DELETE /api/products/:id

💻 Frontend Setup

Frontend folder:

product-frontend/

Install & Run:
cd product-frontend
npm install
npm start


React app will run at:
👉 http://localhost:3000

🔗 Connecting Frontend to Backend

React frontend consumes API like:

http://localhost:5000/api/products

🖼 Image Upload Feature

Images stored in /uploads/

Backend uses multer for handling file uploads

🤝 Contribution

Feel free to fork and improve the project!

📜 License

MIT License
