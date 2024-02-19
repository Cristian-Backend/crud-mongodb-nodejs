const passport = require('passport')
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User.js')

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email,password, done) => {

    //Comparar email
    const user = await User.findOne({email})
    if(!user){
        return done(null, false , {message: 'No se encontro el usuario'})
    } else {
        //Comparar contraseña
      const match =   await user.comparePassword(password) // compara la contraseña que le pasamos con la de la base de  datos.
      if(match){
        return done(null, user) // si hay error null , sino me da el usuario y voy a estar navegando con passport.
      } else {
        return done(null, false, {message: "Incorrect password"} ) // si no coincide.
      }
    }
}))

//cuando haga sesion va a ser seguimiento del ID 
passport.serializeUser((user,done)=> {
done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });