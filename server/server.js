const http = require("http");
const app = require("./app");

const port = 8000;
console.log("Server Running On" + port);

const server = http.createServer(app);

server.listen(port);
