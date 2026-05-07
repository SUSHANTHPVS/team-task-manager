TaskFlow 🚀

A full-stack collaborative task management application inspired by tools like Trello and Asana. This platform enables teams to create projects, assign tasks, manage workflows, and track progress efficiently with role-based access control.

Built as part of the Full-Stack Coding Assignment – Team Task Manager.

📌 Features
🔐 User Authentication
User Signup & Login
Secure Authentication using JWT
Password Encryption
Protected Routes
📁 Project Management
Create Projects
Admin automatically assigned to project creator
Add/Remove Team Members
View Assigned Projects
✅ Task Management
Create Tasks
Assign Tasks to Team Members
Task Priorities:
Low
Medium
High
Task Status:
To Do
In Progress
Done
Due Date Tracking
📊 Dashboard & Analytics
Total Tasks Count
Tasks by Status
Tasks Per User
Overdue Tasks Monitoring
🛡️ Role-Based Access Control
Admin
Manage Team Members
Create/Edit/Delete Tasks
Manage Projects
Member
View Assigned Tasks
Update Task Status
🛠️ Tech Stack
Frontend
React.js
Tailwind CSS
Axios
React Router DOM
Backend
Node.js
Express.js
JWT Authentication
bcrypt.js
Database
MongoDB + Mongoose
Deployment
Railway
📂 Project Structure
team-task-manager/
│
├── client/                 # Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
│
├── README.md
└── .env
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
🔧 Backend Setup
Navigate to server folder
cd server
Install Dependencies
npm install
Create .env File
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
Run Backend
npm run dev

Backend runs on:

http://localhost:5000
💻 Frontend Setup
Navigate to client folder
cd client
Install Dependencies
npm install
Create .env File
VITE_API_URL=http://localhost:5000/api
Run Frontend
npm run dev

Frontend runs on:

http://localhost:5173
🔗 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register User
POST	/api/auth/login	Login User
Projects
Method	Endpoint	Description
GET	/api/projects	Get All Projects
POST	/api/projects	Create Project
PUT	/api/projects/:id	Update Project
DELETE	/api/projects/:id	Delete Project
Tasks
Method	Endpoint	Description
GET	/api/tasks	Get Tasks
POST	/api/tasks	Create Task
PUT	/api/tasks/:id	Update Task
DELETE	/api/tasks/:id	Delete Task
🌐 Deployment
Frontend Deployment

Deploy frontend using Railway/Vercel/Netlify.

Backend Deployment

Deploy backend using Railway.

Environment Variables

Make sure all environment variables are configured correctly in Railway Dashboard.

📸 Screenshots

Add your application screenshots here.



📖 Assignment Requirements Covered

✅ User Authentication
✅ Project Management
✅ Task Management
✅ Dashboard Analytics
✅ Role-Based Access Control
✅ REST APIs
✅ Database Relationships
✅ Deployment
✅ README Documentation

Assignment requirements referenced from the provided PDF.

🚀 Future Improvements
Real-time Notifications
Drag & Drop Task Board
File Attachments
Team Chat System
Email Notifications
Activity Logs
👨‍💻 Author

Sushanth

GitHub: https://github.com/SUSHANTHPVS
LinkedIn: https://www.linkedin.com/in/sushanth-p-v-67290a31b/
📜 License

This project is developed for educational and assessment purposes.