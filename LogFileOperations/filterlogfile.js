var readFile = require('./readFile')


var fileName = './access.log'

var test = async function(){
 try{
 var result = await readFile(fileName);
 console.log(result);
 }
 catch(e){
 console.log(e);
 }

}

test()
