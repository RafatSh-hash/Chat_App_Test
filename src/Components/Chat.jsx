/* eslint-disable no-unused-vars */
// Chat.js
import React, { useState, useEffect } from 'react';
import WebSocketClient from 'websocket';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const socket = new WebSocketClient('wss://ws.postman-echo.com/raw');

    useEffect(() => {
        socket.onopen = () => {
            console.log('WebSocket connection opened.');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Clean up the WebSocket connection when the component unmounts
        return () => socket.close();
    }, []);

    const handleSendMessage = () => {
        const trimmedMessage = messageInput.trim();
        if (trimmedMessage !== '') {
            const message = {
                username: 'User', // You can replace this with the user's actual username
                text: trimmedMessage,
            };
            socket.send(JSON.stringify(message));
            setMessageInput('');
        }
    };

    return (
        <div>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <strong>{message.username}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
