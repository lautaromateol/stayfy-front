const server = require("./src/server");
const { conn, createDefaultAdminUser } = require('./src/db.js');
const { createBooks } = require("./src/controllers/books/getBooksController");
const { deactivateByStock } = require("./src/controllers/books/deactivateByStock")
const http = require('http');
const PORT = 3001;

conn.sync({ force: true }).then( async () => {
  await createBooks();
  await createDefaultAdminUser();
  await deactivateByStock();
  const httpServer = http.createServer(server);
  httpServer.timeout = 300000;

  server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error));
