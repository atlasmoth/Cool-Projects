const socket = require("net").Socket();

socket.connect({ port: "3000", host: "localhost" }, () => {
  const stream = noise();
  setInterval(() => {
    socket.write(JSON.stringify(stream.next()));
  }, 5000);
});

function* noise() {
  while (true) {
    yield Math.round(Math.random() * 500);
  }
}
