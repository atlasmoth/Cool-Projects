const net = require("net");
const server = net.createServer();

const { Readable, pipeline } = require("stream");

const socketPool = [];

server.listen(3000, (e) => {
  if (e) return console.error(e);
  console.log("we outchea");
});

server.on("connection", async (socket) => {
  socketPool.push(socket);
  const stream = Readable.from(socket);
  for await (obj of stream) {
    console.log(JSON.parse(Buffer.from(obj).toString()));
  }
});
