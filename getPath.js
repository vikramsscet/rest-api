const fs = require('fs');
const crypto = require('crypto');
var obj = fs.readFileSync('.serverless/cloudformation-template-update-stack.json', 'utf8').toString();
let path = JSON.parse(obj).Resources.VerifyDashtokenLambdaFunction.Properties.Code.S3Key;
const fileHash = crypto.createHash('sha256');
const readStream = fs.createReadStream('./.serverless/rest-api.zip');

fs.writeFileSync('path.txt', path.replace('/rest-api.zip', ''));
fileHash.setEncoding('base64');
readStream.on('data', chunk => {
    fileHash.write(chunk);
}).on('end', () => {
    fileHash.end();
    let hash = fileHash.read();
    let str = obj.replace(/("CodeSha256"\:\s?)(.*?)(\s*\})/g, `$1"${hash}"$3`);
    fs.writeFileSync('.serverless/cloudformation-template-update-stack.json', str);
}).on('error', error => {
    console.log(error);
});
