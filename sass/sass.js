#!/usr/bin/env node

var library = require('./sass.dart.js');
library.load({
  readline: require("readline"),
  chokidar: require("chokidar"),
  util: require("util"),
  immutable: require("immutable"),
  fs: require("fs"),
});

library.cli_pkg_main_0_(process.argv.slice(2));
