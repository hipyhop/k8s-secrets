#!/usr/bin/env node
"use strict";
const YAML = require("yamljs");

var method = process.argv[2]
var fname = process.argv[3];

var func;
if (!method || (method !== "decode" && method !== "encode")) {
  console.error("Unknown command '" + method + "'. Must be one of 'encode' & 'decode'.");
  process.exit(1);
}
if (method === "decode") {
  func = v => (Buffer.from(v, "base64")).toString();
} else {
  func = v => new Buffer(v).toString("base64");
}

if (!fname) {
  console.error("2nd argument must be a yaml file");
  process.exit(1);
}


var obj = YAML.load(fname);

for (let key in obj.data) {
  obj.data[key] = func(obj.data[key]);
}


console.log(YAML.stringify(obj, 2));
