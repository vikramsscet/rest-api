const fs = require('fs');
let crypto = require('crypto');

var obj = fs.readFileSync('.serverless/cloudformation-template-update-stack.json', 'utf8').toString();
let path = JSON.parse(obj).Resources.VerifyDashtokenLambdaFunction.Properties.Code.S3Key;
fs.writeFileSync('path.txt',path.replace('/rest-api-dev.zip',''));

const fileHash = crypto.createHash('sha256');
fileHash.setEncoding('base64');
const readStream = fs.createReadStream('./.serverless/rest-api-dev.zip');
readStream.on('data', chunk => {
    fileHash.write(chunk);
}).on('end', () => {
    fileHash.end();
    let hash = fileHash.read();
    console.log(hash);

    let str = obj.replace(/("CodeSha256"\:\s?)(.*?)(\s*\})/g, `$1"${hash}"$3`);
    fs.writeFileSync('.serverless/cloudformation-template-update-stack.json', str);
}).on('error', error => {
    console.log(error);
});
