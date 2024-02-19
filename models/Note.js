const {model, Schema} = require('mongoose')

const NoteSchema = Schema({
    title: {
        type: String,
        required: true
    },

    user: {
            type: String,
            required: true

        },

    descriptions: {
        type: String,
        required: true
    }, 



}, { timestamps: true}) // me va a decir cuando fue creado y actualizado la nota.


module.exports = model('Note',  NoteSchema)