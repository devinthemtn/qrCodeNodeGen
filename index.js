const PORT = 3000;

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const QRCode = require("qrcode");

let app = express();
app.set("view engine", "html");
app.use(bodyParser.json({ limit: "50mb" }));
// parse requests of content-type - application/json
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true, keepExtensions: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
  //allow cross origin requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, PUT, OPTIONS, DELETE, GET"
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  QRCode.toDataURL("https://anillabs.com", function (err, url) {
    templatePath = path.join(__dirname + "/code.html");
    fs.readFile(templatePath, { encoding: "utf-8" }, function (err, data) {
      data = data.replace(/##qUrl/g, url);
      res.send(data);
    });
  });
});

app.listen(PORT, () =>
  console.log("Anil Labs QR Code generation on the port: " + PORT)
);
