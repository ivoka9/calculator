const http = require("http");
const app = require("./app");

const port = 8000;
console.log("open");

const server = http.createServer(app);

server.listen(port);
