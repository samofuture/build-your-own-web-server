# Setup
- Need to have Node installed
- Need to have typescript installed
- if it can't find net, run `npm install --save-dev @types/node`

# Steps
## To run code:
Typescript is a version of javascript but it adds type annotations, so you need to compile the typescript file to javascript to run it. Make sure you compile the typescript file before you run javascript.
1. run `npx tsc main.ts`
2. then run `node main.js`
Using [[Command Line Tools#Netcat|netcat]] is very useful here to act as a client.
## What's happening in the code:
1. Create a listening socket
	1. This is just creating a "server" for new connections to join
2. Accepting new connections
	1. This logs new connections and their address when they connect for the first time
3. Error Handling
	1. This event will trigger when an error occurs
	2. Checkout [documentation](https://nodejs.org/api/net.html#class-netserver) for more event handling keywords
4. Read and Write
	1. Utilizes the end and data event handlers to log the events to the console.
	2. Data echoes back and logs the data it received
5. Close the connection
	1. When user enters 'q' exit the connection