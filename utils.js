const DecompressZip = require('decompress-zip');
const excel = require('exceljs');

module.exports = () => {

    var commonUtils = {}
    commonUtils.unzipFile = (src, dest, cb) => {

        return new Promise((resolve, reject) => {
            console.log('in unzip folder');
            console.log('unzip file src ' + src);
            console.log('unzip file dest ' + dest);
            var unzipper = new DecompressZip(src);

            unzipper.on('error', function (err) {
                console.log('Caught an error');
                reject(err);
                console.log(err);
            });

            unzipper.on('progress', function (fileIndex, fileCount) {
               // console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
            });

            unzipper.on('extract', function (log) {
                console.log('Finished extracting');
                resolve();
            });

            unzipper.extract({
                path: dest,
                filter: function (file) {
                    return file.type !== 'SymbolicLink';
                }
            });



        })

    };


    commonUtils.createFile = (file, headers, sheetName, data) => {
        return new Promise((resolve, reject) => {
            let workbook = new excel.Workbook();
            let sheet = workbook.addWorksheet(sheetName);
            sheet.columns = headers;
            data.forEach(info => {
                sheet.addRow(info);
            });

            workbook.csv.writeFile(file).then(() => {
                console.log('write file done ' + file);
                resolve(file);
            });

            // workbook.csv.writeFile(file).then(function () {
            //         // done
            //     });

        });
    };

    return commonUtils;
}