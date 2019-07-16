const Stress = require('../models/stress')

module.exports =
{
    async create(req,res,next)
    {
        try
        {
            const stress = await Stress.create({...req.body, userId: req.userId })
            req.io.emit('create', stress )
            return res.json(stress)
        }
        catch(err)
        {
            return next(err)
        }
    },

    async update(req,res,next)
    {
        try
        {
            const stress = await Stress.findById(req.params.id)
            stress.level = req.body.level
            await stress.save()
            req.io.emit('update', stress )
            res.json(stress)
        }
        catch(err)
        {
            return next(err)
        }
    },

    async list(req,res,next)
    {
        try
        {
            // limitando para futuro historico mensal
            const stress = await Stress.find({ userId: req.userId }).sort('-createdAt').limit(30)
            return res.json(stress)
        }
        catch(err)
        {
            return next()
        }
    }

}