const User = require('../models/user')

module.exports =
{
    async signup(req,res,next)
    {
        try
        {
            const { email } = req.body

            if(await User.findOne({ email }))
            {
                return res.status(400).json({ err: "email already exists" })
            }

            const user = await User.create(req.body)
            //console.log(await User.generateToken())
            return res.json({ user,token: user.generateToken() })
        }
        catch(err)
        {
            return next(err)
        }
    },

    async signin(req,res,next)
    {
        try
        {
            const { email,password } = req.body
            const user = await User.findOne({ email })

            if(!user)
            {
                return res.status(400).json({ err: "user does not exists" })
            }

            if(!await user.compareHash(password))
            {
                return res.status(400).json({ err: "password incorrect" })
            }
            
            return res.json({ user,token: user.generateToken() })

        }
        catch(err)
        {
            return next(err)
        }
    }
}