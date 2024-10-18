# Event Loop
Javascript is run within the event loop. The event loop is essentially a while loop that listens for events, then runs your script(s) based on what the event(s). This process repeats once all the events have been processed, hence the name event loop.

This process is single-threaded, so javascript code is expected to have short runtimes to not halt the event loop.

## Server Side Concurrency
While running JS code on a server, it's important to remember that if there are multiple connections to the server, there are going to be multiple events for every connection. Naturally, if there are too many connections, and the event loop is waiting for JS code to finish for a connection, this will leave other connections waiting. There's two approaches to this: voluntarily yield to the runtime and/or moving the CPU intensive code out of the event loop via multithreading. Multithreading is out of scope for this project (for now) but what we are concerned about is IO. 

## Blocking vs. Non-Blocking IO
The OS provides both blocking and non-blocking mode for network IO:
- In blocking mode, the calling OS thread blocks until the result is ready.  
- In non-blocking mode, the OS immediately returns if the result is not ready (or is ready), and there is a way to be notified of readiness (for event loops).
Node.JS runtime uses non-blocking mode because blocking mode is incompatible with event-based concurrency. The only blocking operation in an event loop is polling the OS for more events when there is nothing to do.

## Synchronous vs Asynchronous
### Synchronous
This type of API blocks the calling OS thread to wait for the result. This type of API isn't used in networking applications because it stops the event loop.
### Asynchronous
This type of API doesn't block the event loop since the code doesn't wait for the result. The code instead returns to the runtime, waiting for the result to be finished. Once this happens, the runtime invokes the callback to continue running the code.

Most Node.JS APIs are callback or promise based (asynchronous).
#### [[Promises]]
