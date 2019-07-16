const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth')

const UserSchema = new mongoose.Schema(
{
    name:
    {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true,   
        lowercase: true
    },
    password:
    {
        type: String,
        required: true,
        // select: false
    }

},{timestamps: true})

UserSchema.pre('save', async function(next)
{
    if(! this.isModified('password')) next()

    this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods =
{
    compareHash(password)
    {
        return bcrypt.compare(password,this.password)
    },

    generateToken()
    {   
        return jwt.sign({ id: this._id },secret,{ expiresIn: 86400 })   
    }
}

module.exports = mongoose.model('User', UserSchema)