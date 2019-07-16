const mongoose = require('mongoose')

const StressSchema = new mongoose.Schema(
{
    level:
    {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    context:
    {
        type: String
    },
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},{timestamps: true})


module.exports = mongoose.model('Stress', StressSchema)