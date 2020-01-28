let { JSDOM } = require('jsdom')
var resolve = require('resolve');
const countriesFolder = './countries/';
const fs = require('fs');

fs.readdir(countriesFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
    resolve('snapsvg', { basedir: __dirname }, function (err, resource) {
      if (err) console.error(err)
      else {
        const options = {
          runScripts: "dangerously",
          resources: "usable",
          url: "file:///prueba.html" // avoid cors error reading svg file
        };
        const dom = new JSDOM(`
          <!DOCTYPE html><html><body><div id="test"></div></body></html>
        `, options);
        var script = dom.window.document.createElement('script');
        script.src = `file://${resource}`;
        var head = dom.window.document.getElementsByTagName('head')[0];
        head.appendChild(script);
        script.onload = function () {
          var s = dom.window.Snap("#test");
          dom.window.Snap.load("file:///Users/acetin/Desktop/ProjectPersonal/SVGToJVector/countries/"+file, onSVGLoaded);
          function onSVGLoaded(data) {
            var countryName = file.slice(0, file.indexOf("."));;
            var b = s.append(data);
            var content = s.node.getElementsByTagName("svg")[0].getElementsByTagName("g")[0];
            var jsonObject = {
              name: countryName,
              paths: {}
            };
            for (let index = 0; index < content.getElementsByTagName("path").length; index++) {
              var countryInfo =  getCountryInfo(index, content);
              var key = Object.keys(countryInfo);
              jsonObject.paths[key] = countryInfo[key];
            }
            //console.log(JSON.stringify(jsonObject));
            let countryJsonData = JSON.stringify(jsonObject);
            fs.writeFileSync('countriesJson/'+countryName+'.json', countryJsonData);
          }
    
          function getCountryInfo(index, content) {
            var country = content.getElementsByTagName("path")[index];
            var countryData = {};
            var dataKey = country.getAttribute("id");
            countryData[dataKey] = {};
            data = {
              "path": country.getAttribute("d"),
              "name": country.getAttribute("title")
            };
            countryData[dataKey] = data;
            //console.log(JSON.stringify(countryData));
            return countryData;
          }
        };
      }
    });
  });
});

