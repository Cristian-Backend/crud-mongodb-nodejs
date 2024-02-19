
const Note = require('../models/Note')

const notesRenderForm = (req,res) => {
    res.render('notes/new-note')
}

const createNewNote = async(req,res) => {
 const {title, descriptions } = req.body
const newNote = new Note ({title, descriptions})
    newNote.user = req.user.id // guardar el id del usuario 
await newNote.save();

req.flash('success_msg', 'Note added successfully') // Nota agregada con exito

res.redirect('/notes')

console.log(newNote)

}
 
const allNotes = async(req,res) => {
    // mostrame las notas deñ usuario que es capturado con el id. Esto hace la nota privada.
   const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}) 

   res.render('notes/all-notes', {notes}) // le paso el notes a la pagina all-notes hbs, al ser find es todas las notas
}


const renderEditForm = async (req, res) => { // render formulario de actualizar

    const note = await Note.findById(req.params.id).lean();

    if(note.user != req.user.id) { // si la nota es distinta al usuario actual (es para que otro usuario no pueda actualizar tu propia nota.)
        req.flash('error_msg', 'Not Authorized')
        return res.redirect('/notes')
    }

    res.render("notes/edit-note", { note });
}


const updateNotes = async(req,res) => {
    const {title, descriptions} = req.body // traigo el titulo y la descripcion que quiero actualizar
  await Note.findByIdAndUpdate(req.params.id, {title,  descriptions}) 
    req.flash('success_msg', 'Note updated Sucessfully') // Nota editada con exito
    res.redirect('/notes')
}


const deleteNotes = async(req,res) => {

    const {id} = req.params

     await Note.findByIdAndDelete(id)
     req.flash('success_msg', 'Note deleted Sucessfully') // nota eliminada con exito.
     res.redirect('/notes')
}

module.exports = {
   notesRenderForm,
   createNewNote,
   allNotes,
   renderEditForm,
   updateNotes,
   deleteNotes
}