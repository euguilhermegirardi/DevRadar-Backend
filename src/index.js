const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http'); // from Node.js
const app = express();
const server = http.Server(app); // Now I have the http server outside of the Express.js
const { setupWebSocket } = require('./websocket');

setupWebSocket(server);

mongoose.connect('mongodb+srv://devradar123:devradar123@cluster0-dhfwd.mongodb.net/devradar10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// HTTP methods: get, post, put, delete

// Params types:
// query params: req.query - filter, pagination... ( almost all the times for GET )
// route params: req.params - Identify a request in the edit or remove ( PUT AND DELETE )
// body: req.body - Data to create or edit a register ( POST AND PUT )

app.use(cors());
app.use(express.json()); // To understand requests with JSON format (req.body). ** BEFORE routes **
app.use(routes);
server.listen(3333);
