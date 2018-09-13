'use strict';
const Note = require('./note/Note');

let note = new Note();

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  note.create(event.body, callback);
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  note.getOne(event.pathParameters.id, callback);
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  note.getAll(callback);
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  note.update(event.pathParameters.id, event.body, callback);
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  note.delete(event.pathParameters.id, callback);
};