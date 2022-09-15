const path = require("path");
const fs = require("fs");
const solc = require("solc");

const subscribePath = path.resolve(__dirname, "contracts", "Subscribe.sol");
const source = fs.readFileSync(subscribePath, "utf8");

module.exports = solc.compile(source, 1).contracts[":Subscribe"];