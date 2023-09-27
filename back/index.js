const server = require("./src/server");
const { conn } = require('./src/db.js');
const http = require('http');
const PORT = 3001;

conn.sync({ force: false }).then(() => {
  const httpServer = http.createServer(server);
  httpServer.timeout = 300000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
