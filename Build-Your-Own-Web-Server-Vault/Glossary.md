## Client
A **client** is a network entity that initiates a connection to a server by sending a request to a specific address (IP + port). The client seeks to access resources or services provided by the server.
## Server
A **server** is a network entity that listens for incoming connection requests from clients at a designated address (IP + port). It waits for clients to connect and is responsible for processing their requests and providing the necessary resources or services.
## Peer
A **peer** refers to a device or node that operates in a similar capacity as both a client and a server, rather than strictly adhering to one role.
## Byte stream
An ordered sequence of bytes. Protocols make sense of what is in these bytes.
## Protocol
Like file formats, except the total length is unknown and the data is read in one pass.
## Socket Handle
A unique identifier for a socket. It allows applications to interact with the socket through system calls. In Linux, a socket handle is simply a file descriptor (fd). In Node.js, socket handles are wrapped into JS objects with methods on them.
# [[Javascript Overview#Event Loop|Event Loop]]


