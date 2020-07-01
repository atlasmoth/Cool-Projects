require("dotenv").config();
const express = require("express");
const chance = require("chance").Chance();
const http = require("http");

// initialize express
const app = express();

function dataGen() {
  return {
    headers: ["Name", "Age", "Profession", "Country"],
    rows: Array.from(new Array(10), () => {
      return [
        chance.name(),
        chance.age(),
        chance.profession(),
        chance.country({ full: true }),
      ];
    }),
  };
}

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/data", (req, res) => {
  const { headers, rows } = dataGen();
  res.json({ headers, rows, updatedAt: new Date().toISOString() });
});

// error catch all
app.all("/*", (req, res, next) => {
  next({ message: "You might be lost boi." });
});
app.use((error, req, res, next) => {
  res.json({
    success: false,
    message: error.message || "Server/user error, try again",
  });
});
// start server
http.createServer(app).listen(process.env.PORT, (e) => {
  if (e) console.log(e);
  console.log(`lsitening on ${process.env.PORT}`);
});
