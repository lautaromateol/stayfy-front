const server = require("./src/server");
const { conn, createDefaultAdminUser } = require('./src/db.js');
const http = require('http');
const { createBooks } = require("./src/controllers/getBooksController");
const PORT = 3001;

conn.sync({ alter: true }).then( async () => {
  await createBooks();
  await createDefaultAdminUser();
  const httpServer = http.createServer(server);
  httpServer.timeout = 300000;

  server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error));
