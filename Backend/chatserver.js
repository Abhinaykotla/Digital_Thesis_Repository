const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wdm',
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(bodyParser.json());

let userSockets = {};

app.get('/api/chats/:senderId/:receiverId', async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT * FROM user_chats 
       WHERE (sender_id = ? AND receiver_id = ?) 
          OR (sender_id = ? AND receiver_id = ?)
       ORDER BY date ASC`,
      [senderId, receiverId, receiverId, senderId]
    );
    res.status(200).json({ status: 'success', chats: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});

app.post('/api/chats', async (req, res) => {
  const { sender_id, name, receiver_id, message } = req.body;

  if (!sender_id || !receiver_id || !message) {
    return res.status(400).json({ status: 'error', error: 'Invalid data' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO user_chats (sender_id, name, receiver_id, message) 
       VALUES (?, ?, ?, ?)`,
      [sender_id, name, receiver_id, message]
    );

    const chatMessage = {
      sender_id,
      name,
      receiver_id,
      message,
      date: new Date(), // Add the date here
    };

    // Emit the message to both sender and receiver
    if (userSockets[sender_id]) {
      io.to(userSockets[sender_id]).emit('receiveMessage', chatMessage);
    }
    if (userSockets[receiver_id]) {
      io.to(userSockets[receiver_id]).emit('receiveMessage', chatMessage);
    }

    res.status(201).json({ status: 'success', chatId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('registerUser', (userId) => {
    userSockets[userId] = socket.id;
    console.log(`User ${userId} is now connected with socket ${socket.id}`);
  });

  socket.on('sendMessage', async (data) => {
    const { sender_id, name, receiver_id, message } = data;

    try {
      const [result] = await db.query(
        `INSERT INTO user_chats (sender_id, name, receiver_id, message) 
         VALUES (?, ?, ?, ?)`,
        [sender_id, name, receiver_id, message]
      );

      const chatMessage = {
        sender_id,
        name,
        receiver_id,
        message,
        date: new Date(), // Add the date here
      };

      // Emit the message to both sender and receiver
      if (userSockets[sender_id]) {
        io.to(userSockets[sender_id]).emit('receiveMessage', chatMessage);
      }
      if (userSockets[receiver_id]) {
        io.to(userSockets[receiver_id]).emit('receiveMessage', chatMessage);
      }
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    for (let userId in userSockets) {
      if (userSockets[userId] === socket.id) {
        delete userSockets[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
