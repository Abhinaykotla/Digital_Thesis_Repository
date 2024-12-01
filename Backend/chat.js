const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');  // Import mysql2
const cors = require('cors'); // Import the cors package

// Initialize the app and the server
const app = express();
const server = http.createServer(app);

// Enable CORS for socket.io
const io = socketIo(server, {
  cors: {
    origin: '*',  // You can replace '*' with a specific domain if you want to restrict access
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }
});

// Enable CORS for HTTP requests
app.use(cors({
  origin: '*',  // You can replace '*' with a specific domain if you want to restrict access
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your database username
  password: '', // Replace with your database password
  database: 'wdm', // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit();
  }
  console.log('Connected to the MySQL database');
});

// Serve the client files (you'll create this next)
app.use(express.static('public'));

// Middleware to parse incoming requests as JSON
app.use(express.json());

// API endpoint to fetch all users
app.get('/users', (req, res) => {
  const query = 'SELECT user_id, first_name FROM users'; // Adjust the query according to your users table
  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error fetching users from database:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.status(200).json({ users: rows });
  });
});

// API endpoint to fetch messages between selected users
app.get('/messages/:userId', (req, res) => {
  const { userId } = req.params;
  const currentUserId = 1;  // Replace this with the actual logged-in user ID

  const query = `
    SELECT * FROM chat_messages
    WHERE (sender_id = ? AND recipient_id = ?)
    OR (sender_id = ? AND recipient_id = ?)
    ORDER BY timestamp DESC
    LIMIT 20`;

  db.query(query, [currentUserId, userId, userId, currentUserId], (err, rows) => {
    if (err) {
      console.error('Error fetching messages from database:', err);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
    res.status(200).json({ messages: rows });
  });
});

// Handle incoming connections from clients
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming chat messages
  socket.on('chatMessage', (msg) => {
    const { message, sender, receiver } = msg;

    // Insert the message into the database
    const query = 'INSERT INTO chat_messages (message, sender_id, recipient_id) VALUES (?, ?, ?)';
    db.query(query, [message, sender, receiver], (err, result) => {
      if (err) {
        console.error('Error inserting message into database:', err);
        return;
      }
      console.log('Message inserted into database');

      // Emit the message to both sender and receiver
      io.to(sender).emit('chatMessage', { message, sender });
      io.to(receiver).emit('chatMessage', { message, sender });
    });
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
