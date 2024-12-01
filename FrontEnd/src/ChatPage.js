import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const Chat = () => {
  const senderId = parseInt(localStorage.getItem('user_id'));
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // console.log(typeof(senderId));
    if (senderId) {
      socket.emit('registerUser', senderId);
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, [senderId]);

  useEffect(() => {
    const fetchChats = async () => {
      if (receiverId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/chats/${senderId}/${receiverId}`
          );
          setMessages(response.data.chats);
        } catch (err) {
          console.error('Error fetching chats:', err);
        }
      }
    };
    fetchChats();
  }, [receiverId, senderId]);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      if (
        (message.sender_id == receiverId && message.receiver_id == senderId) ||
        (message.sender_id == senderId && message.receiver_id == receiverId)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [receiverId, senderId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      sender_id: senderId,
      name: 'Your Name',
      receiver_id: receiverId,
      message: newMessage,
    };

    try {
      await axios.post('http://localhost:5000/api/chats', messageData);

      socket.emit('sendMessage', messageData);
      const fetchChats = async () => {
        if (receiverId) {
          try {
            const response = await axios.get(
              `http://localhost:5000/api/chats/${senderId}/${receiverId}`
            );
            setMessages(response.data.chats);
          } catch (err) {
            console.error('Error fetching chats:', err);
          }
        }
      };
      fetchChats();
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="mt-5">
      <div className="container-fluid row vh-100">
        <div className="col-md-4 border-end bg-light">
          <h5 className="p-3 border-bottom">Users</h5>
          <div className="list-group">
          {users
  .filter((user) => user.user_id !== senderId) 
  .map((user) => (
    <button
      key={user.user_id}
      className={`list-group-item list-group-item-action ${
        receiverId == user.user_id ? 'active' : ''
      }`}
      onClick={() => setReceiverId(user.user_id)}
    >
      {user.first_name}
    </button>
  ))}

          </div>
        </div>

        <div className="col-md-8 d-flex flex-column">
          {receiverId ? (
            <>
              <div className="border-bottom p-3 bg-white">
                <h5>Chat with {users.find((u) => u.user_id == receiverId)?.first_name}</h5>
              </div>

              <div className="flex-grow-1 p-3 overflow-auto bg-light chat-height">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`d-flex mb-3 ${
                      msg.sender_id == senderId ? 'justify-content-end' : ''
                    }`}
                  >
                    <div
                      className={`p-2 rounded ${
                        msg.sender_id == senderId
                          ? 'bg-primary text-white'
                          : 'bg-secondary text-white'
                      }`}
                      style={{ maxWidth: '70%' }}
                    >
                      <p className="mb-1 text-white">{msg.message}</p>
                      <small>
                        {new Date(msg.date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-top p-3 bg-white">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                  />
                  <button className="btn btn-primary" onClick={handleSendMessage}>
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
              <p className="text-center">Select a user to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
