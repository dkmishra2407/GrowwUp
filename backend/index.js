const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
require('./db/dbconn.js');
const Order = require('./models/Order.js');
const Watchlist = require('./models/Watchlist.js');
const routes = require('./routes/routes.js');

const WebSocket = require("ws");

const app = express();
const server = require('http').createServer(app);
const port = 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(routes);

app.get('/', (req, res) => {
  res.send('Welcome to GrowUp APIs');
});

server.listen(port, () => console.log(`Server is running at ${port}`));

// WEBSOCKET SERVER 
const WebSocketSever = new WebSocket.Server({ server: server });

WebSocketSever.on('connection', function connection(ws, req) {

  ws.on('message', async function message(data, isBinary) {
    const userId = JSON.parse(data.toString())
    console.log("WS: ", userId);

    for await (const client of WebSocketSever.clients) {
      client.userId = userId
      if (client == ws && client.readyState === WebSocket.OPEN) {

        const userWatchlist = await Watchlist.find({ userId: client.userId?.userId });

        let resp = {
          active: WebSocketSever.clients.size,
          belongs: "connection",
          watchlistSize: userWatchlist.length,
        }
        client.send(JSON.stringify(resp))
      }
    }
  });

  ws.on('close', () => console.log('Client has disconnected!'));

});


