var readFile = require('./readFile')
var utils = require('./utils')();
var fs = require('fs');



// to run script
// fileName = 'zip file path' node index.js

var test = async function () {
    try {
        console.log("file Name :"+process.env.fileName);
        var src = process.env.fileName;
        var dest = __dirname + '/'
        await utils.unzipFile(src, dest)
        fileName = __dirname + '/var/log/nginx/access.log';
        var result = await readFile(fileName);

        var keys = Object.keys(result)
        var data = []
        keys.forEach(info => {
            var obj = {}
            obj['key'] = info;
            obj['value'] = result[info];
            data.push(obj)
        })

        var file = src.split('/')
        file = file[file.length - 1];
        file = file.replace('.zip', '.csv');
        utils.createFile(file, [{
            header: 'key',
            key: 'key',
            witdh: 10
        }, {
            header: 'value',
            key: 'value',
            witdh: 10
        }], 'logs', data);
    } catch (e) {
        console.log(e);
    }

}

test()