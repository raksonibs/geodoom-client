var requirejs = require('requirejs');
var fs = require('fs');
var path = require('path');
var async = require("async");
var _ = require("underscore");
Q = require('q');

// {"user": "attributes": [], "relationships": {belongsTo: [""], hasMany: [""]}}

var models = {}

var presetModels = { balance_change:
   { attributes:
      [ 'changeType: attr(\'string\')',
        'entryDate: attr(\'string\')',
        'value: attr(\'number\')' ],
     relationships: { belongsTo: [], hasMany: [Object] } },
  battle:
   { attributes:
      [ 'winnerId: attr(\'number\')',
        'loserId: attr(\'number\')',
        'winnerEmail: attr(\'string\')',
        'loserEmail: attr(\'string\')',
        'name: attr(\'string\')',
        'challengedEmail: attr(\'string\')',
        'challengerEmail: attr(\'string\')',
        'status: attr(\'string\')',
        'challengerPetId: attr(\'string\')',
        'challengedPetId: attr(\'string\')',
        'challengerPet: attr()',
        'challengedPet: attr()',
        'currentTurn: attr(\'number\')',
        'currentTurnEmail: attr(\'string\')',
        'createdAt: attr(\'string\')' ],
     relationships: { belongsTo: [Object], hasMany: [Object] } },
  game_stat:
   { attributes: [ 'name: attr(\'string\')', 'value: attr(\'number\')' ],
     relationships: { belongsTo: [Object], hasMany: [Object] } },
  pet_state:
   { attributes:
      [ 'currentHealth: attr(\'number\')',
        'currentAttack: attr(\'number\')',
        'currentDefence: attr(\'number\')',
        'shield: attr(\'boolean\')' ],
     relationships: { belongsTo: [Object], hasMany: [Object] } },
  pet:
   { attributes:
      [ 'name: attr(\'string\')',
        'level: attr(\'number\')',
        'vertices: attr(\'number\')',
        'colour: attr(\'string\')' ],
     relationships: { belongsTo: [Object], hasMany: [Object] } },
  stat:
   { attributes: [ 'statType: attr(\'string\')', 'value: attr(\'number\')' ],
     relationships: { belongsTo: [Object], hasMany: [Object] } },
  state:
   { attributes: [ 'name: attr(\'string\')', 'currentTurn: attr(\'integer\')' ],
     relationships: { belongsTo: [Object], hasMany: [Object] } },
  user:
   { attributes:
      [ 'currency: attr(\'string\')',
        'email: attr(\'string\')',
        'uid: attr(\'string\')',
        'nickname: attr(\'string\')',
        'image: attr(\'string\')',
        'online: attr(\'boolean\')' ],
     relationships: { belongsTo: [], hasMany: [Object] } } }

var string = `<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Ember ERD</title>
    <meta name='description' content=''>
    <meta name='viewport' content='width=device-width', initial-scale='1'>
  </head>
  <body>
    <h1> Ember ERD Model Visualizer TEST </h1>
`

function func(data, model) {
  // console.log("LINE: " + data);
  var data = data.trim().replace(",", '');

  if (/attr/.test(data) && !/import/.test(data)) {
    models[model]["attributes"].push(data);
  } else if (/hasMany/.test(data) || /belongsTo/.test(data) && !/import/.test(data)) {
    if (/hasMany/.test(data)) {      
      models[model]["relationships"]["hasMany"].push(data);
    } else {
      // console.log("PRITING OVER HERE MAN", data);
      models[model]["relationships"]["belongsTo"].push(data);
    }
  }
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

// async.waterfall([
//   function readDir(readDirCallback) {
//     console.log("reading directory")
//     fs.readdir(path.resolve(__dirname, 'app/models/'), readDirCallback)
//   }, function readFile(files, readFileCallback) {      
//       for (var i = 0; i < files.length; i++) {
//         console.log("reading file ", files[i]);
//         fs.readFile(path.resolve(__dirname, "app/models/" + files[i]), "utf8", readFileCallback)
//       }
//   }, function writeFile(writeCallback) {
//     console.log("writing")
//   }
// ], function(error) {
//   if (error) {
//     console.log(error);
//   }
// })

// Q.nfcall(fs.readdir, path.resolve(__dirname, 'app/models/'))
// .then(function(data) {
//   console.log('files are', data);
//   var promises = [];
//   for (var i = 0; i < data.length; i++) {
//     console.log("FILE IS", data[i])
//     if (/\.js/.test(data[i])) {
//       // (function() {
//       //   var model = data[i].split(".")[0];
//       //   models[model] = {
//       //                   "attributes": [],
//       //                   "relationships": {"belongsTo": [], "hasMany": []}
//       //                 };
//         // return Q.nfcall(fs.readFile, path.resolve(__dirname, "app/models/" + data[i]), "utf8"),
//       (function() {
//         promises.push(fs.readFile(path.resolve(__dirname, "app/models/" + data[i]), "utf8")) 
//         // return Q.nfcall(fs.readFile, path.resolve(__dirname, "app/models/" + data[i]), "utf8");
//       })()
//     }
//     console.log(promises)
//     return Q.allSettled(promises)
//     // })()
//   }
// })
// .then(function(data) {
//   console.log('file is', data);
// })
// .fail(function(err) {
//   console.log('error recorded:', err);
// })
// .done()


fs.readdir(path.resolve(__dirname, 'app/models/'), function (err, data) {
  if (err) {
    return console.log(err);
  }

  for (var i = 0; i < data.length; i++) {
    if (/\.js/.test(data[i])) {
      // console.log(data[i]);

      (function() {
        // console.log(data[i])
        var model = data[i].split(".")[0];
        models[model] = {
                        "attributes": [],
                        "relationships": {"belongsTo": [], "hasMany": []}
                      };
        fs.readFile(path.resolve(__dirname, "app/models/" + data[i]), "utf8", function(err, fileData) {
          // console.log("MODEL: ", model)
          // console.log("FILE DATA: ", fileData)
          readLines(fileData, func, model);
            // console.log(models);
        })
      })();


    }
  }

  var keys = _.keys(presetModels);
  // console.log(keys)

  var modelString = '';
// + "" + item.split[':'][1].split('(')[0].replace(')', '') 
  for (var j = 0; j < keys.length; j++) {
    console.log(presetModels[keys[j]]["attributes"][0].trim().split(":"))
    var items = _.map(presetModels[keys[j]]["attributes"], function(item) { return " " + item.trim().split(":")[0] + " (" + item.trim().split(":")[1].trim().replace("(", "").replace(")", "").replace("\'", '').split('attr')[1].replace('\'', '') + ")"})
    // console.log(items)
    // console.log(presetModels[keys[j]]["attributes"])
    modelString = `<div class="model">
                    <h1>Model Name: ${[keys[j]]}</h1>
                    <p>Attributes: ${items}</p>
                    <p>Relationships: </p>
                  </div>`
    // console.log(presetModels[keys[j]])
    string += modelString;
  }

  string += `</body></html>`

  fs.writeFile(path.resolve(__dirname, 'index.html'), string, function(err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
  }); 
});