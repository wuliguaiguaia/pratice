var CLI = require('clui'),
  clc = require('cli-color');

var Line = CLI.Line,
  LineBuffer = CLI.LineBuffer;

var outputBuffer = new LineBuffer({
  x: 0,
  y: 0,
  width: 'console',
  height: 'console'
});

var message = new Line(outputBuffer)
  .column('Title Placehole', 20, [clc.green])
  .fill()
  .store();
outputBuffer.output();

