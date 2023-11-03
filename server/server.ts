const http = require('http');
//@ts-ignore
const app = require('./app');

const port = 8000;
console.log('Server Running On ' + port);

const server = http.createServer(app);

server.listen(port);
