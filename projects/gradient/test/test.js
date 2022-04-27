const fs = require("fs");
const { generator } = require("../dist");

fs.writeFileSync("../sample.svg", generator("oo"));
