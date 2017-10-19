#!/usr/bin/env node

var List = require('term-list');
var exec = require('child_process').exec;

var list = new List({ marker: '> ', markerLength: 2 });
list.add('https://registry.npmjs.org/', 'https://registry.npmjs.org/');
list.add('https://registry.npm.taobao.org/', 'https://registry.npm.taobao.org/');
list.add('https://r.cnpmjs.org/', 'http://r.cnpmjs.org/');
list.add('exit', '[exit]');
list.start();
 
list.on('keypress', function(key, item){
  switch (key.name) {
    case 'return':
      if (item == 'exit') {
        list.stop();
      }
      else {
        exec('npm config set registry "' + item + '"', function(err){
          list.stop();
          if (err) {
            console.log(err);
          } else {
          }
        });
      }
      break;
  }
});

list.on('empty', function(){
  list.stop();
});