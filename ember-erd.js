
var requirejs = require('requirejs');
var fs = require('fs');
var path = require('path');
var async = require("async");
var _ = require("underscore");
Q = require('q');

// {"user": "attributes": [], "relationships": {belongsTo: [""], hasMany: [""]}}


var capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
        z-index: 100;
      }

      .model .name,
      .model .attrs,
      .model .relations {        
        width: 32%;
        display: inline-block;
        margin: 10px;
        z-index: 100;
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

      .arrow {
        position: absolute;
        background: black;
        width: 40px;
        height: 5px;
        transform-origin: 0% 50%;
        transition: all 100ms cubic-bezier(.8,.5,1,.8);
        /*border-radius: 50%/100px 100px 0 0;*/
        background-image/*: url("http://www.iconsdb.com/icons/preview/black/arrow-18-xxl.png");
        background-size: cover;
        background-posit*/ion: center;
        z-index: -1000;
      }

      .arrow:after {
        display: block;
        content:'';
        border-top: 7px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 14px solid black;
        transform: translate(40px, -5px);  
      }
    </style>
  </head>
  <body>
    <h1> Ember ERD Model Visualizer TEST3 </h1>
    <div class="models">
`

function addStringScript() {
return `                      
  </div>
  <script>
    function angle(p1,p2) { 
      var dx=p2.x-p1.x,
          dy=p2.y-p1.y,
          c=Math.sqrt(dx*dx+dy*dy),
          deg;
      deg=(c>0) ? Math.asin(dy/c)/(Math.PI/180) : 0;
      deg=(dx>0) ? deg : 180-deg;  
      return (deg).toFixed(2); 
    }

    function pythagoras(point1, point2) {
      return (Math.sqrt(Math.pow(Math.abs(point1.x-point2.x), 2) + Math.pow(Math.abs(point1.y-point2.y), 2)))
    }

    init = function() {
      var arrows = document.getElementsByClassName('arrow');

      for (var i = 0; i < arrows.length; i++) {
        (function() {
          arrows[i].remove();
        })()
      };
      console.log("started")
      var models = document.getElementsByClassName('model');
      var belongsTo, hasMany, modelName;
      for (var i =0; i < models.length; i++) {
        belongsTo = models[i].dataset.belongsto
        hasMany = models[i].dataset.hasmany
        modelName = models[i].dataset.model
        var divFrom = models[i]
        if (modelName === "user" || modelName === "battle") {

          if (hasMany.length !== 0) {
            // name is pluralized so remove s to search
            var rels = hasMany.split(" ")
            for (var j = 0; j <  rels.length; j++) {

              var toName = rels[j].slice(0, -1);
              var divTo = document.querySelectorAll("[data-model='"+toName+"']")[0]

              var divFromCoords = divFrom.getBoundingClientRect()
              var divToCoords = divTo.getBoundingClientRect()
              var divFromCenter = {
                "x": divFromCoords.left + divFromCoords.width/2,
                "y": divFromCoords.top + divFromCoords.height/2,
              }

              var divToCenter = {
                "x": divToCoords.left + divToCoords.width/2,
                "y": divToCoords.top + divToCoords.height/2,
              }

              // need to figure out where to put arrow,
              // if the model from is above model to, then we aim for top of container
              // if model from is below to (via top in coords), aim for the bottom of the model container
              var newArrow = document.createElement("div"); 
              newArrow.className += "arrow"
              newArrow.className += " " + modelName + "_to_" + toName
              newArrow.style.top = divFromCenter.y + "px";
              newArrow.style.left = (divFromCenter.x) + "px"
              // newArrow.style.bottom = divFromCoords.bottom + "px"
              // newArrow.style.right = divFromCoords.right + "px";

              var deg = angle({"x": divFromCenter.x,
                             "y": divFromCenter.y
                            }, 
                          {"x": divToCenter.x, 
                           "y": divToCenter.y
                          });
              
              var distanceForArrow = pythagoras(divFromCenter, divToCenter) + "px"
              
              var prefixTransform = "transform";


              newArrow.style[prefixTransform]="rotate(" + deg + "deg)";
              newArrow.style.width = distanceForArrow;
              
              document.body.appendChild(newArrow);

              if (divFromCoords.top > divToCoords.top) {
                // arrow needs to point down
                
              } else {
                // arrow needs to point up
              }                              
            }
          }
        }
        console.log("modelName: " + modelName + " with belongsTo " + belongsTo + " and hasMany " + hasMany );
      }
      console.log('finished')
    }

    window.onresize = init

    init()
  </script>
  </body></html>`
}

function addToModels(data, model) {
  // console.log("LINE: " + data);
  var data = data.trim().replace(",", '');

  if (/attr/.test(data) && !/import/.test(data)) {
    models[model]["attributes"].push(data);
  } else if ((/hasMany/.test(data) || /belongsTo/.test(data)) && !/import/.test(data)) {
    var formattedData = data.trim().split(":")[0]
    if (/hasMany/.test(data)) {
      // console.log("PRITING OVER HERE MAN", data);
      models[model]["relationships"]["hasMany"].push(formattedData);
    } else {
      // console.log("PRITING OVER HERE MAN", formattedData);
      models[model]["relationships"]["belongsTo"].push(formattedData);
    }
  }
  // return models
}

function readLines(data, addToModels, model) {
  var remaining = "";

  remaining += data;
  var index = remaining.indexOf('\n');
  var last = 0;
  while (index > -1) {
    var line = remaining.substring(last, index);
    last = index + 1; 
    addToModels(line, model);
    index = remaining.indexOf('\n', last);
  }

  remaining = remaining.substring(last);

  if (remaining.length > 0) {
    addToModels(remaining, model);
  }
}

function readLinesFromFile(keys, j, model) {
  if (models[keys[j]]["attributes"] !== undefined) {      
    var attributes = _.map(models[keys[j]]["attributes"], function(item) { return " " + item.trim().split(":")[0] + " <span class='attr-val'>" + item.trim().split(":")[1].trim().replace("(", "").replace(")", "").replace("\'", '').split('attr')[1].replace('\'', '') + "</span><br />"})
  } else {
    var attributes = models[keys[j]]["attributes"]
  }

  var relationships = models[keys[j]]["relationships"]
  modelString = `<div class="model" data-model="${[keys[j]]}" data-belongsTo="${relationships[
                      "belongsTo"].join(" ")}" data-hasMany="${relationships[
                      "hasMany"].join(" ")}">
                  <div class="name">
                    ${[keys[j]]}
                  </div>
                  <div class="attrs">
                    ${attributes.join(" ")}
                  </div>
                  <div class="relations">
                    belongsTo: ${relationships[
                      "belongsTo"].join(", ")}
                    <br />
                    hasMany: ${relationships[
                      "hasMany"].join(", ")}
                  </div>
                </div>`
  string += modelString;
}

fs.readdir(path.resolve(__dirname, 'app/models/'), function (err, data) {
  if (err) {
    return console.log(err);
  }

  for (var i = 0; i < data.length; i++) {
    if (/\.js/.test(data[i])) {

      (function() {
        var model = data[i].split(".")[0].split("-");
        if (model.length >= 2) {
          model = model[0] + capitalize(model[1]);
        } else {
          model = model[0];
        }

        models[model] = {
                        "attributes": [],
                        "relationships": {"belongsTo": [], "hasMany": []}
                      };
        fs.readFile(path.resolve(__dirname, "app/models/" + data[i]), "utf8", function(err, fileData) {
          readLines(fileData, addToModels, model);

          if (data[data.length - 1].split(".")[0] === model) {
            console.log('DONEDONEONDONDONE')
            var keys = _.keys(models);

            var modelString = '';

            for (var j = 0; j < keys.length; j++) {
              readLinesFromFile(keys, j, model)
            }

            string += addStringScript()

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