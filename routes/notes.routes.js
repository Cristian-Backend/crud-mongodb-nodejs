const {Router} = require('express')
const {  notesRenderForm, createNewNote, allNotes, updateNotes, renderEditForm, deleteNotes } = require('../controllers/notes.controllers')
const router = Router()

const { isAuthenticated } = require('../helpers/auth')

//New note
router.get('/notes/add', isAuthenticated , notesRenderForm) // estar autenticado, ruta protegida.// me devuelve el formulario para poder tipear tareas.

router.post('/notes/new-note', isAuthenticated ,createNewNote)

//Get all notes
router.get('/notes', isAuthenticated, allNotes)


//Edit notes
router.get('/notes/edit/:id', isAuthenticated, renderEditForm) // para mostrar el formulario

router.put('/notes/edit/:id', isAuthenticated , updateNotes)

//Delete note
router.delete('/notes/delete/:id', isAuthenticated, deleteNotes )

module.exports = router