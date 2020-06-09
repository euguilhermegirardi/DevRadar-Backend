const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebSocket = (server) => {
  //console.log('ok')
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs)
    });

    // TEST WITH MOBILE
    // setTimeout(() => {
    //   socket.emit('message', 'Hello new job')
    // }, 3000);
  })
};

// Filter connections and search those which match the location and techs.
// DevController.js
exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {

    // Compare coordinates from the dev registered just now with the coordinates stored from the connections.
    return calculateDistance(coordinates, connection.coordinates) < 10

    // at least one tech match the techs which is from the dev registered
    && connection.techs.some(item => techs.includes(item))
  })
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data)
  })
};
