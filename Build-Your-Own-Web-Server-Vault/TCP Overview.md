![[tcp-ip-model-layers-and-their-functions.png]]
TCP is Bidirectional and Full-Duplex

TCP Depends on the IP layer. Each packet from the IP layer has 3 components:
- Sender's Address
- Receiver's Address
- Message Data
TCP does two things:
- Turning packets into [[Glossary#Byte stream|byte streams]]
- Reliable and ordered delivery of data
This resolves problems with the IP layer, including missing, out of order, and large (enough to exceed a single packet) packets.

## TCP Byte Stream
[[Glossary#Byte stream|Byte Streams]] have a "TCP send buffer" which is where the data is stored before transmission. Multiple writes to the buffer are indistinguishable from a single write. The data is encapsulated into one or more IP packets, the boundaries in IP aren't related to the original write boundaries. There is also a TCP receive buffer which is available to applications as it arrives.
<u>Protocols are required to interpret TCP data by imposing boundaries within the byte stream</u>.

## TCP Connections
Mostly managed by the OS. Use the [[Glossary#Socket Handle|Socket Handle]] to refer to the connection in the socket API. Any OS handle must be closed by the application to terminate the underlying resource and recycle the handle. 
[[Socket Primitives]]
### Start
To establish a TCP connection, there needs to be a [[Glossary#Client|Client]] and a [[Glossary#Server|Server]] (ignoring the simultaneous case). The server waits for a client at an address (IP + port), this is called _bind & listen_. Then the client can connect to that address.
Connecting is a 3 step handshake, which is done by the OS (and not our concern).
1. SYN
2. SYN-ACK
3. ACK
Once the handshake is completed, the connection can be accepted by the server.

### End
A peer tells the other side that no more data will be sent with the FIN flag, then the other side ACKs the FIN. Each direction of the channels can be terminated independently, so the other side performs the same handshake fully to close the connection.

### Half-Open Connections
```javascript
let server = net.createServer({allowHalfOpen: true});
```
Since each connection is ended independently it's possible to make use of the state where one direction is closed and the other is still open. This is known as TCP half-open. For example, if peer A half closes the connection to peer B:
- A can't send any data but can still receive from B
- B gets EOF, but can still send to A

If half-open connections are allowed, `socket.end()` will no longer close the connection. Use `socket.destroy()` to close the connection manually.

This kind of connection isn't used a lot, most of the time, applications will treat EOF as being fully closed, and will close the socket immediately.
## UDP
This is on the same layer, but still uses packets like the IP layer. UDP adds port numbers over those IP packets.