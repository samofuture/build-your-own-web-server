Promises are an alternative to callbacks. They are asynchronous, and their main advantage is how the code is written compared to callbacks. Callbacks will, by their nature, scatter your code. Promises keep things more together. Some, but not all, Node.JS libraries are both callback and promise based, however it is possible to convert callback libraries into promise based libraries.

# Converting Callback to Promise
```javascript
function do_something_promise() {  
	return new Promise<T>((resolve, reject) => {
		do_something_cb((err, result) => { 
			if (err) {
				reject(err); 
			} else {
				resolve(result);
			}
		}); 
	});
}
```
## Terminology
- resolve()