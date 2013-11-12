#!/usr/bin/env node

var dg        = require('dogescript');
var fs        = require('fs');
var util      = require('util');
var repl      = require('repl');
var Transform = require('stream').Transform;

fs.writeSync(1, fs.readFileSync(__dirname + '/banner', 'utf-8'))

util.inherits(DogeJSStream, Transform);
function DogeJSStream(){
  Transform.call(this);
}
 
DogeJSStream.prototype._transform = function(chunk, encoding, next){
  var script = dg( chunk.toString() );
  var lines  = script.split(/\n+/);
  for(var i=0; i<lines.length; i++)
    if(lines[i]) this.push( lines[i] + '\n' );
  next();
}

var ds = new DogeJSStream();

repl.start({
  prompt : "DOGE> ",
  input  : ds,
  output : process.stdout
});

process.stdin.pipe(ds);
