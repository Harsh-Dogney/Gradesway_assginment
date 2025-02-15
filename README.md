# 🎓 Quizo - Quiz Management System  

A **responsive Quiz Management System** that allows **teachers** to **create, manage, and delete quizzes** effortlessly. Built using **React (Frontend)**, **TypeScript (Backend)**, **ShadCN UI**, and **MySQL/PostgreSQL (Database)**.



---

## 🌟 Features  
✅ **User Authentication** – Simple login system with static credentials.  
✅ **Quiz Management** – Create, View, Edit, and Delete quizzes.  
✅ **Modern UI** – Built using **ShadCN UI** for a sleek & responsive design.  
✅ **RESTful API** – CRUD operations for managing quizzes.  
✅ **Database Storage** – Uses **MySQL/PostgreSQL** to persist data.  

---

## 🖥️ Tech Stack  
### **Frontend**  
- ⚛️ React (Vite)  
- 🎨 ShadCN UI  
- 📡 Axios for API calls  

### **Backend**  
- 🟦 Node.js (TypeScript)  
- 🚀 Express.js  
- 🗄️ MySQL / PostgreSQL  
- 🔐 Basic Authentication  

---

## 🔧 Setup Instructions  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-username/Quizo.git
cd Quizo
```

### **2️⃣ Install Dependencies**  
#### **Frontend Setup**  
```sh
cd frontend
npm install
npm run dev
```

#### **Backend Setup**  
```sh
cd backend
npm install
npm run dev
```

### **3️⃣ Configure Database**  
- Use **MySQL/PostgreSQL** and create a database.
- Update **.env** file with your **DB credentials**.

### **4️⃣ Run the Application**  
```sh
npm start
```
Now open **http://localhost:5173/** in your browser. 🚀  

---

## 📌 API Documentation  

### **1️⃣ Authentication**  
🔹 **POST** `/login` - Validate login credentials.  

#### Request  
```json
{
  "username": "teacher",
  "password": "password123"
}
```
#### Response  
```json
{
  "message": "Login successful"
}
```

---

### **2️⃣ Quiz Management**  

#### 🔹 **GET** `/quizzes` - Fetch all quizzes.  
#### 🔹 **POST** `/quizzes` - Create a new quiz.  
#### 🔹 **GET** `/quizzes/:id` - Get quiz details.  
#### 🔹 **PUT** `/quizzes/:id` - Update a quiz.  
#### 🔹 **DELETE** `/quizzes/:id` - Delete a quiz.  

#### Example Quiz Object  
```json
{
  "id": 1,
  "title": "Science Quiz",
  "description": "A fun science quiz!",
  "createdAt": "2025-02-15"
}
```

---

## 🏗️ Database Schema  

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  teacher_id INT REFERENCES users(id)
);
```


