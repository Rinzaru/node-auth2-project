require("dotenv").config();

const server = require("./server");
const port = process.env.port || 5000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
