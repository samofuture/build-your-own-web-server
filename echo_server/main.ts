// This is where all the networking stuff is
import * as net from "net";

function newConn(socket: net.Socket): void{
    console.log('new connection', socket.remoteAddress, socket.remotePort);
    socket.on('end', () => {
        // FIN Received connection will be closed automatically
        console.log('EOF.')
    });

    // Read and Write
    socket.on('data', (data: Buffer) => {
        console.log('data:', data);
        socket.write(data); //Echo back the data

        // If the data has a q, quit
        if (data.includes('q')) {
            console.log('closing.');
            socket.end();   // No longer works after half open enabled
            socket.destroy();
        }
    });
}

// Different sockets are represented as JS objects
// Creates a listening socket whose type is net.server
let server = net.createServer({allowHalfOpen: true});

// For more events for a server: https://nodejs.org/api/net.html#class-netserver

// Binds and listens on an address
server.listen({host: '127.0.0.1', port:1234})

// On a connection event, run the newConn function
server.on('connection', newConn);

// On an error event, throw the error
server.on('error', (err: Error) => {throw err;});
