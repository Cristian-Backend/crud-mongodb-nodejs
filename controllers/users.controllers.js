const {response} = require('express')
const User = require('../models/User')
const passport = require('passport')

//sing Up registrarse

const renderSingUpForm = (req,res=response) => {

    res.render('users/singup')
}

//crear usuario en el registro
const singup = async(req,res=response) => {

    const errors = []
    const {name,email,password,confirm_password} = req.body

    //VALIDAR CAMPO DE REGISTRO
    if(password != confirm_password){ // Si la contraeña no coincide 
        errors.push({text: "Password do not match"})
    }
        if(password.length < 4){ // la contrasdeña debe tener al menos 4 caracteres
            errors.push({text: 'your password should be at least 4 characteres in length'})
        }
           if(errors.length > 0) {
            res.render('users/singup', {errors , name , email}) // le paso los errores a la vista , el name y el email es para que no vuelva a tipear.
    } else {
            const emailUser = await User.findOne({email})
            // si existe el email en la bd
            if(emailUser){
                req.flash('error_msg', 'El email ya esta en uso')
                res.redirect('/users/singup')

            } else{
                // si no exsite se crea el registro
              const newUser =  new User ({name,email,password})
              newUser.password = await newUser.encryptPassword(password) // el metodo este esta en el modelo User.
                  await  newUser.save()
                  req.flash('success_msg', 'Te has registrado correctamente')
                    res.redirect('/users/singin')
            }
    }

}


//Iniciar sesion Singin
const rendersingInForm = (req,res = response) => {
res.render('users/singin')
}


const singIn = passport.authenticate('local', {
    failureRedirect: '/users/singin',  //cuando falle algo de la funcion passport de config me va a llevar a
    successRedirect: '/notes', // si todo sale bien a notas
    failureFlash: true // quiero en true el flash si ocurre un error.
})



//Cerrar sesion

const logout = (req, res = response) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            req.flash('success_msg', 'You are logged out now.');
            res.redirect('/users/singin');
        }
    });
}


module.exports = {
    renderSingUpForm,
    singup,
    rendersingInForm,
   singIn,
    logout
}