# Feedback Management System

A comprehensive full-stack feedback management application built with React and Express.js that allows users to submit feedback and view analytics in real-time.

## Features

- **Submit Feedback**: Users can submit feedback with name, email, message, and rating
- **View Analytics**: Real-time statistics showing total feedbacks, average rating, positive/negative feedback counts
- **Filter & Search**: Filter feedbacks by star rating
- **Export to CSV**: Download all feedback data as CSV file
- **Responsive Design**: Fully responsive and mobile-friendly interface
- **Beautiful UI**: Modern gradient design with smooth animations

## Project Structure

\`\`\`
feedback-management-system/
├── frontend/                 # React frontend
│   ├── public/
│   │   └── index.html       # HTML template
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── App.js          # Main app component
│   │   ├── App.css         # App styles
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Frontend dependencies
│   └── .env               # Environment variables
└── backend/               # Express backend
    ├── models/            # MongoDB models
    ├── routes/            # API routes
    ├── config/            # Configuration files
    ├── server.js          # Express server
    ├── package.json       # Backend dependencies
    └── .env              # Environment variables
\`\`\`

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for database)

## Backend Setup

1. Navigate to backend folder:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file with MongoDB connection string:
\`\`\`
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/feedback_db?retryWrites=true&w=majority
PORT=5000
\`\`\`

4. Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

The server will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to frontend folder:
\`\`\`bash
cd ../frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file:
\`\`\`
REACT_APP_API_URL=http://localhost:5000/api
\`\`\`

4. Start the React development server:
\`\`\`bash
npm start
\`\`\`

The app will open at `http://localhost:3000`

## API Endpoints

### Submit Feedback
- **POST** `/api/feedback`
- Body: `{ name, email, message, rating }`

### Get All Feedbacks
- **GET** `/api/feedback`

### Get Statistics
- **GET** `/api/stats`

### Search Feedbacks by Rating
- **GET** `/api/feedback/search?rating=5`

### Export Feedbacks as CSV
- **GET** `/api/feedback/export`

## Dependencies

### Backend
- Express.js - Web framework
- Mongoose - MongoDB ODM
- CORS - Cross-origin resource sharing
- Dotenv - Environment variables

### Frontend
- React - UI library
- Axios - HTTP client
- Lucide-react - Icon library
- React-toastify - Notifications

## Technologies Used

- **Frontend**: React 18, CSS3, Axios
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Styling**: Modern CSS with gradients and animations
- **Icons**: Lucide React

## Future Enhancements

- User authentication and profiles
- Feedback replies and comments
- Advanced analytics and charts
- Email notifications
- User dashboard
- Admin panel for feedback moderation

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
