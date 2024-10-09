"use strict";
exports.__esModule = true;
// This is where all the networking stuff is
var net = require("net");
function newConn(socket) {
    console.log('new connection', socket.remoteAddress, socket.remotePort);
    socket.on('end', function () {
        // FIN Received connection will be closed automatically
        console.log('EOF.');
    });
    socket.on('data', function (data) {
        console.log('data:', data);
        socket.write(data); //Echo back the data
        // If the data has a q, quit
        if (data.includes('q')) {
            console.log('closing.');
            socket.end();
        }
    });
}
// Different sockets are represented as JS objects
// Creates a listening socket whose type is net.server
var server = net.createServer();
// For more events for a server: https://nodejs.org/api/net.html#class-netserver
// Binds and listens on an address
server.listen({ host: '127.0.0.1', port: 1234 });
// On a connection event, run the newConn function
server.on('connection', newConn);
// On an error event, throw the error
server.on('error', function (err) { throw err; });
// Read and Write
