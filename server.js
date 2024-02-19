const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override') // este midleware lo que hace es que puedo utilizar endpoints con el formulario.
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
require('./config/passport')



const indexRouter = require('./routes/index.routes')
const notesRouter = require('./routes/notes.routes')
const userRoutes = require('./routes/user.routes')
const app = express()


//Settings
app.set('views', path.join(__dirname, 'views')); // saber la ruta completa de views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs')




//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(session({
    secret: 'secreto',
    resave:true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());



//global variables // para usar conect flash
app.use((req, res, next )=> {
    res.locals.success_msg = req.flash("success_msg");
res.locals.error_msg = req.flash('error_msg')
res.locals.error = req.flash('error')
res.locals.user = req.user || null
next()
})


//routes
app.use('/', indexRouter)
app.use('/', notesRouter )
app.use('/', userRoutes)

//static files
app.use(express.static(path.join(__dirname,  "public")));

module.exports = app

