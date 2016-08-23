fs = require('fs');
var path = require('path');

// {"user": "attributes": [], "relationships": {belongsTo: [""], hasMany: [""]}}

var models = {}

function func(data) {
  console.log("LINE: " + data);
}

function readLines(data, func) {
  var remaining = "";

  remaining += data;
  var index = remaining.indexOf('\n');
  var last = 0;
  while (index > -1) {
    var line = remaining.substring(last, index);
    last = index + 1; 
    func(line);
    index = remaining.indexOf('\n', last);
  }

  remaining = remaining.substring(last);

  if (remaining.length > 0) {
    func(remaining);
  }
}

fs.readdir(path.resolve(__dirname, 'app/models/'), function (err, data) {
  if (err) {
    return console.log(err);
  }

  for (var i = 0; i < data.length; i++) {
    if (/\.js/.test(data[i])) {
      // console.log(data[i]);
      var model = data[i].split(".")[0];
      models[model] = {
                        "attributes": [],
                        "relationships": {}
                      }
      fs.readFile(path.resolve(__dirname, "app/models/" + data[i]), "utf8", function(err, fileData) {
        // console.log(fileData);
        readLines(fileData, func)
      })

    }
  }

  console.log(models);
});