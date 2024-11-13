import * as net from "net";

// Promise Based API for TCP Sockets
type TCPConn = {
    // the JS socket object
    socket: net.Socket;

    // from the 'error' event
    err: null|Error;

    // from the 'end' event
    ended: boolean;

    // the callbacks of the promise of the current read
    reader: null|{
        resolve: (value: Buffer) => void,
        reject: (value: Error) => void
    };
};

// create a wrapper from net.Socket
function soInit(socket: net.Socket): TCPConn {
    const conn: TCPConn = {
        socket: socket, err: null, ended: false, reader: null,
    };

    // Handling 'data' event
    socket.on('data', (data: Buffer) => {
        console.assert(conn.reader);
        // pause the 'data' event until the next read
        conn.socket.pause();
        // fulfill the promise of the current read
        conn.reader!.resolve(data);
        conn.reader = null;
    });

    // Handling 'end' event
    socket.on('end', () => {
        // this also fulfills the current read
        conn.ended = true;
        if (conn.reader) {
            conn.reader.resolve(Buffer.from('')); // EOF
            conn.reader = null;
        }
    });

    // Handling 'error' event
    socket.on('error', (err: Error) => {
        // Errors are also delivered to the current read.
        conn.err = err;
        if (conn.reader) {
            conn.reader.reject(err);
            conn.reader = null;
        }
    });
    return conn
}

function soRead(conn: TCPConn): Promise<Buffer> {
    console.assert(!conn.reader);   // no concurrent calls
    return new Promise((resolve, reject) => {
        // if the connection isn't readable, complete the promise now
        if (conn.err) {
            reject(conn.err);
            return;
        }
        if (conn.ended) {
            resolve(Buffer.from(''));   // EOF
            return;
        }
        
        // save the promise callbacks
        conn.reader = {resolve: resolve, reject: reject};
        // and resume the 'data' event to fulfill the promise later
        conn.socket.resume();
    });
}

function soWrite(conn: TCPConn, data: Buffer): Promise<void> {
    console.assert(data.length > 0);
    return new Promise((resolve, reject) => {
        // If there is an error, reject now
        if (conn.err) {
            reject(conn.err);
            return;
        }

        conn.socket.write(data, (err?: Error) => {
            if (err) {
                reject(err)
            } else {
                resolve();
            }
        });
    });
}

async function newConn(socket: net.Socket): Promise<void> {
    console.log('new connection', socket.remoteAddress, socket.remotePort);
    try {
        await serveClient(socket);
    } catch (exc) {
        console.error('exception', exc);
    } finally {
        socket.destroy();
    }
}

async function serveClient(socket: net.Socket): Promise<void> {
    const conn: TCPConn = soInit(socket);
    while (true) {
        const data = await soRead(conn);
        if (data.length === 0) {
            console.log('end connection');
            break;
        }

        console.log('writing data', data);
        await soWrite(conn, data);
    }
}

const server = net.createServer({
    pauseOnConnect: true,   // required by TCPConn
});

// Binds and listens on an address
server.listen({host: '127.0.0.1', port:1234})

// On a connection event, run the newConn function
server.on('connection', newConn);

// On an error event, throw the error
// server.on('error', (err: Error) => {throw err;});