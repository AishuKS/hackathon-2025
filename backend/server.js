// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const foodRoutes = require('./routes/foodRoutes');
// const chatRoutes = require('./routes/chatRoutes');
// const userRoutes = require('./routes/userRoutes');
// const db = require('./models/db');  // DB connection
// const authMiddleware = require('./middleware/authMiddleware');
// const roleMiddleware = require('./middleware/roleMiddleware');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());  // To parse incoming JSON requests
// app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

// // API Routes
// app.use('/api/auth', authRoutes);  // Authentication (Login/Signup)
// app.use('/api/food', authMiddleware, roleMiddleware(['sharer', 'taker']), foodRoutes);  // Food listings (sharer/Taker)
// app.use('/api/chat', authMiddleware, roleMiddleware(['sharer', 'taker']), chatRoutes);  // Chat functionality (sharer/Taker)
// app.use('/api/user', authMiddleware, userRoutes);  // User profile management

// // Default route for testing
// app.get('/', (req, res) => {
//     res.send('Welcome to the Food Sharing App!');
// });

// // Database connection check
// db.connect((err) => {
//     if (err) {
//         console.error('Database connection error:', err);
//         process.exit(1);  // Exit if database connection fails
//     }
//     console.log('Database connected successfully!');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);  // Mocked data route for food
app.use('/api/chat', chatRoutes);  // Mocked data route for chat
app.use('/api/user', userRoutes);  // Mocked data route for user
app.use('/api/food', foodRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Food Sharing App!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
