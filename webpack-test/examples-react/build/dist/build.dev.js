"use strict";

var rm = require('rimraf');

var path = require('path');

var chalk = require('chalk');

var webpack = require('webpack');

var config = require('./webpack.config');

var ora = require('ora'); // 版本问题


var spinner = ora('building for production...');
spinner.start();
rm(path.resolve(__dirname, './../dist'), function (err) {
  if (err) throw err;
  webpack(config, function (err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow('  Tip: built files are meant to be served over an HTTP server.\n' + '  Opening index.html over file:// won\'t work.\n'));
  });
});