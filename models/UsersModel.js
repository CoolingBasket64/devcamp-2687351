const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "El nombre es requerido"]
        },
        email:{
            type: String,
             required: [true, "El email es necesario"],
             match: [
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                        ,
                        "email no válido"
                    ]
        },
        role:{
            type:String,
            required: [true, "El rol es necesario"],
            enum:[
                "user",
                "publisher"
            ]
        },
        password:{
            type:String,
            required: [true, "La contraseña es requerida"],
            maxlength:[6, "Máximo 6 caracteres"],
            select: false
        },
        createAt:{
            type: Date,
            default: Date.now
        }
    }
)

//crear la acción pre
UserSchema.pre('save', async function(next) {
    //Crea la sal
    const sal = await bcryptjs.genSalt(10)
    //Enciptar contraseña
    this.password = await bcryptjs.hash(this.password, sal)

})
module.exports = mongoose.model('User', UserSchema )