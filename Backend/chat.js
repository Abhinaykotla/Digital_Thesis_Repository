const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wdm',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit();
  }
  console.log('Connected to the MySQL database');
});

app.use(express.static('public'));
app.use(express.json());

app.get('/users', (req, res) => {
  const query = 'SELECT user_id, first_name FROM users';
  db.query(query, (err, rows) => {
    if (err) {
      console.error('Error fetching users from database:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.status(200).json({ users: rows });
  });
});

app.get('/messages/:userId', (req, res) => {
  const { userId } = req.params;
  const currentUserId = 1;

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

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chatMessage', (msg) => {
    const { message, sender, receiver } = msg;

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

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
