var hashMap = {};
var LineByLineReader = require('line-by-line');

module.exports = function readFile(fileName) {
    return new Promise(function (resolve, reject) {

        lr = new LineByLineReader(fileName);
        lr.on('error', function (err) {
            reject();
            // 'err' contains error object
        });

        lr.on('line', function (line) {
            var test = line.split(']')[1];
            test = test.split(' HTTP/1.1"')[0];
            let value = test + ' HTTP/1.1"';
            value = value.trim();
            if (hashMap[value] == undefined) {
                hashMap[value] = 1;
            } else {
                hashMap[value] = hashMap[value] + 1;
            }
            // 'line' contains the current line without the trailing newline character.
        });

        lr.on('end', function () {
            resolve(hashMap)
          //  console.log(hashMap)
            // All lines are read, file is closed now.
        });
    })
}