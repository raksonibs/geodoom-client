var requirejs = require('requirejs');
var fs = require('fs');
var path = require('path');
var async = require("async");
var _ = require("underscore");
Q = require('q');

// {"user": "attributes": [], "relationships": {belongsTo: [""], hasMany: [""]}}

var models = {}

var string = `<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Ember ERD</title>
    <meta name='description' content=''>
    <meta name='viewport' content='width=device-width', initial-scale='1'>
    <style>
      body,
      html {
        width: 100%;
        height: 100%;
      }

      .models {
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
        flex-wrap: wrap;
      }

      .model {
        // display: inline-block;
        border: 1px solid black;
        width: 400px;
        // height: 200px;
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        
      }

      .model .name,
      .model .attrs,
      .model .relations {        
        width: 32%;
        display: inline-block;
        margin: 10px;
      }

      .model .name,
      .model .attrs {
        border-right: 1px solid black;
        height: 100%;
      }

      .model .name {        
        font-weight: 900;
      }

      .model .attrs .attr-val {
        color: lightgrey;
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <h1> Ember ERD Model Visualizer TEST2 </h1>
    <div class="models">
`

function func(data, model) {
  // console.log("LINE: " + data);
  var data = data.trim().replace(",", '');

  if (/attr/.test(data) && !/import/.test(data)) {
    models[model]["attributes"].push(data);
  } else if (/hasMany/.test(data) || /belongsTo/.test(data) && !/import/.test(data)) {
    if (/hasMany/.test(data)) {
      console.log("PRITING OVER HERE MAN", data);
      models[model]["relationships"]["hasMany"].push(data);
    } else {
      console.log("PRITING OVER HERE MAN", data);
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
          // console.log("I IS", i)
          // console.log("DATA IS", data.length)
          // console.log("model is", model) 
          // console.log("data last is", data[data.length-1]) 
          if (data[data.length - 1].split(".")[0] === model) {
            console.log('DONEDONEONDONDONE')
            // console.log(models)
            var keys = _.keys(models);
            // console.log(keys)

            var modelString = '';
          // + "" + item.split[':'][1].split('(')[0].replace(')', '') 
            for (var j = 0; j < keys.length; j++) {
              if (models[keys[j]]["attributes"] !== undefined) {      
                var attributes = _.map(models[keys[j]]["attributes"], function(item) { return " " + item.trim().split(":")[0] + " <span class='attr-val'>" + item.trim().split(":")[1].trim().replace("(", "").replace(")", "").replace("\'", '').split('attr')[1].replace('\'', '') + "</span><br />"})
              } else {
                var attributes = models[keys[j]]["attributes"]
              }

              var relationships = models[keys[j]]["relationships"]
              // console.log(attributes)
              // console.log(models[keys[j]]["attributes"])
              modelString = `<div class="model">
                              <div class="name">
                                ${[keys[j]]}
                              </div>
                              <div class="attrs">
                                ${attributes.join(" ")}
                              </div>
                              <div class="relations">
                                ${relationships}
                              </div>
                            </div>`
              // console.log(models[keys[j]])
              string += modelString;
            }

            string += `</div></body></html>`

            fs.writeFile(path.resolve(__dirname, 'index.html'), string, function(err) {
              if (err) {
                  return console.log(err);
              }

              console.log("The file was saved!");
            }); 
          }
        })
      })();

    }
  }

  
})