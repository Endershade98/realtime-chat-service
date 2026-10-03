// src/presentation/websocket/websocket.gateway.js

const WebSocket = require('ws');
require('dotenv').config();

const WS_PORT = process.env.WS_PORT || 8080;

const wss = new WebSocket.Server({ port: WS_PORT });

wss.on('connection', (ws) => {
  console.log('Nuova connessione');

  ws.on('message', (msg) => {
    console.log('Messaggio ricevuto:', msg.toString());
    // Echo minimal per test
    ws.send(JSON.stringify({ event: 'ECHO', data: msg.toString() }));
  });

  ws.on('close', () => console.log('Connessione chiusa'));
});

console.log(`WebSocket Gateway in ascolto sulla porta ${WS_PORT}`);