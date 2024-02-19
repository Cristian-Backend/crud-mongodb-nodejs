const {model, Schema} = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    }, 

    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    }

},{ timestamps: true}) // cuando fue creado y actualizado.


// encriptamos la contraseña directamente cuando se  cree el usuario y tenga que logearse.
UserSchema.methods.encryptPassword = async password => {
const salt = await bcrypt.genSalt(10)
return await bcrypt.hash(password, salt)
}

//comparamos la contraseña con la contraeña de la base de datos encriptada.
UserSchema.methods.comparePassword =  async function(password){
    return await bcrypt.compare(password, this.password) 
}

module.exports = model('User', UserSchema)