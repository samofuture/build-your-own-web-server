# Netcat
This command creates a TCP Connection to the destination host and port, and then attaches the connection to stdin and stdout. Does not work with HTTPS.
```bash
nc example.com 80 <filename.txt
```


# Socat
More modern version of netcat
```bash
socat tcp:example.com:80
```

# Telnet
```bash
telnet example.com 80
```
# Curl
This command uses an existing HTTP client instead of creating a new one (hence why there is no port number specified). Curl supports HTTPS, but doesn't really provide as much as it does with HTTP.
```bash
curl -vvv http://example.com
```
# Openssl
This command is creating a secure client to an HTTPS connection. 
```bash
openssl s_client example.com:443
```
