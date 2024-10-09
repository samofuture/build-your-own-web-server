Domain Name System

DNS is designed to run on UDP as well as [[TCP Overview|TCP]] (since TCP is able to use large messages).

When running on UDP, there is a setup like this:
```
| IP header |         IP payload       | 
            \........................../
            | UDP header | UDP payload |
			             \............./
			             | DNS message |
```

When running on TCP, a 2 byte length field is prepended to each DNS message so the server/client can tell which part of the byte stream is which message. This is the simplest example of an application protocol on top of TCP. It looks like this:
```
| len1 | msg1 | len2 | msg2 | ...
```
