const fs = require('fs');
var obj = fs.readFileSync('.serverless/cloudformation-template-update-stack.json', 'utf8');
let path = JSON.parse(obj).Resources.VerifyDashtokenLambdaFunction.Properties.Code.S3Key;
fs.writeFileSync('path.txt',path.replace('/rest-api.zip',''));
