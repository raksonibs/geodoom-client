fs = require('fs');
var path = require('path');

fs.readFile(path.resolve(__dirname, 'notes.md'), 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});