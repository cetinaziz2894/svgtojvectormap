var fs = require('fs');
const path = require("path");
const countriesFolder = './countries/';

fs.readdir(countriesFolder, (err, files) => {
    files.forEach(file => {
        
        var name = file;
        var rename = file.slice(0,file.length-8)+file.slice(file.length-4, file.length);
        fs.rename(name, 'deneme', function (err) {
            if (err) throw err;
            console.log(file + ' File Renamed.');
          });
    })
});