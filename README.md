
🛠️ Local Setup Instructions

Follow these steps to run the project on your local machine.

📦 Prerequisites
Make sure you have the following installed:

Node.js (v16 or higher recommended)

MongoDB (or use MongoDB Atlas for cloud DB)

Git

🔄 Clone the Repository

git clone https://github.com/Khushbu-8/Employee-managment-system

📁 Project Structure

├── frontend/         # Frontend (React.js or tailwind css)
├── backend/         # Backend (Nodejs and Express.js)
├── .env            # Environment variables
└── README.md

🚀 Running the Project Locally

1. Backend Setup
cd backend  
npm install
Create a .env file inside the server folder with the following variables:

PORT=4000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

Start the backend server:
npm start

2. Frontend Setup

cd ../frontend
npm install

In A src -> servies -> api folder 
set const baseUrl = "http:/localhost:4000"

Start the frontend:
npm run dev

✅ You’re All Set!

Visit the frontend at http://localhost:5173 and ensure the backend is running at http://localhost:4000.

