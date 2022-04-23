const express = require("express");
const server = express();
const bodyParser = require("body-parser");

const createEchoResponse = require("./create-echo-response.js");

server
  .use(bodyParser.json())
  .post("/webhook", (req, res) => res.json(createEchoResponse(req.body)))
  .listen(process.env.PORT || 5000);
