const create = require("../handler").create;
const connectToDatabase = require('./db');
describe("Testing create", function(){
    it("creating note record", function(done){

        var event = {};
        var context = {};
        var callback = (ctx, data)=>{
            console.log(data);
            done();
        }

        create(event, context, callback);
    });
});