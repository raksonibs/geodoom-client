fs = require('fs');
var path = require('path');

// {"user": "attributes": [], "relationships": {belongsTo: [""], hasMany: [""]}}

var models = {}

function func(data, model) {
  // console.log("LINE: " + data);
  models[model]["attributes"].push(data);
  // return models
}

function readLines(data, func, model) {
  var remaining = "";

  remaining += data;
  var index = remaining.indexOf('\n');
  var last = 0;
  while (index > -1) {
    var line = remaining.substring(last, index);
    last = index + 1; 
    func(line, model);
    index = remaining.indexOf('\n', last);
  }

  remaining = remaining.substring(last);

  if (remaining.length > 0) {
    func(remaining, model);
  }
}

fs.readdir(path.resolve(__dirname, 'app/models/'), function (err, data) {
  if (err) {
    return console.log(err);
  }

  for (var i = 0; i < data.length; i++) {
    if (/\.js/.test(data[i])) {
      // console.log(data[i]);


      // fs.readFile(path.resolve(__dirname, "app/models/" + data[i]), "utf8", function(err, fileData) {
      //   var promise = new Promise(function(resolve, reject) {        
      //     // console.log(fileData);
      //     readLines(fileData, func, model)
      //     resolve(models);
      //   })

      //   promise
      //   .then(function(val) {
      //     console.log(val);
      //   })
      //   .catch(function(val) {
      //     console.log(val);
      //   })
      // });

      // fs.readFile(path.resolve(__dirname, "app/models/" + data[i]), "utf8", function(err, fileData) {
      //     readLines(fileData, func, model);

      //     if (i === data.length) {
      //       console.log(models);
      //     }
      //   })

      (function() {
        // console.log(data[i])
        var model = data[i].split(".")[0];
        models[model] = {
                        "attributes": [],
                        "relationships": {}
                      };
        fs.readFile(path.resolve(__dirname, "app/models/" + data[i]), "utf8", function(err, fileData) {
          console.log("MODEL: ", model)
          console.log("FILE DATA: ", fileData)
          readLines(fileData, func, model);

          if (i === data.length) {
            console.log(models);
          }
        })
      })();


    }
  }
});