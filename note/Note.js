const NoteModel = require('./models/Note');
const connectToDatabase = require('../db');
let util = require('../util/Utility');
class Note {

    create(note, callback) {
        connectToDatabase()
            .then(() => {
                NoteModel.create(JSON.parse(note))
                    .then(note => callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(note)
                    }))
                    .catch(err => callback(null, {
                        statusCode: err.statusCode || 500,
                        headers: { 'Content-Type': 'text/plain' },
                        body: 'Could not create the note.'
                    }));
            });
    }
    getOne(id, callback) {
        connectToDatabase()
            .then(() => {
                NoteModel.findById(id)
                    .then(note => callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(note)
                    }))
                    .catch(err => callback(null, {
                        statusCode: err.statusCode || 500,
                        headers: { 'Content-Type': 'text/plain' },
                        body: 'Could not fetch the note.'
                    }));
            });
    }
    getAll(callback) {
        connectToDatabase()
            .then(() => {
                NoteModel.find()
                    .then(notes => callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(notes)
                    }))
                    .catch(err => callback(null, {
                        statusCode: err.statusCode || 500,
                        headers: { 'Content-Type': 'text/plain' },
                        body: 'Could not fetch the notes.'
                    }))
            });
    }
    update(id, body, callback) {
        connectToDatabase()
            .then(() => {
                NoteModel.findByIdAndUpdate(id, JSON.parse(body), { new: true })
                    .then(note => callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(note)
                    }))
                    .catch(err => callback(null, {
                        statusCode: err.statusCode || 500,
                        headers: { 'Content-Type': 'text/plain' },
                        body: 'Could not fetch the notes.'
                    }));
            });
    }
    delete(id, callback) {
        connectToDatabase()
            .then(() => {
                NoteModel.findByIdAndRemove(id)
                    .then(note => callback(null, {
                        statusCode: 200,
                        body: JSON.stringify({ message: 'Removed note with id: ' + note._id, note: note })
                    }))
                    .catch(err => callback(null, {
                        statusCode: err.statusCode || 500,
                        headers: { 'Content-Type': 'text/plain' },
                        body: 'Could not fetch the notes.'
                    }));
            });
    }
}
module.exports = Note;