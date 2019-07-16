const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const { secret } = require('../config/auth')

module.exports = async (req,res,next) =>
{
    try
    {
        //Bearer asdokasdokasodj
        const authHeader = req.headers.authorization
        
        if(!authHeader)
        {
            return res.status(401).json({ err: 'No token provider' })
        }
    
        const parts = authHeader.split(' ')
        
        if(parts.length !== 2)
        {
            return res.status(401).json({ err: 'token error' })
        }
        const [ pre,token ] = parts
    
        if(pre !== 'Bearer')
        {
            return res.status(401).json({ err: 'token malformatted' })
        }
        const decoded = await promisify(jwt.verify)(token,secret)
        req.userId = decoded.id
        return next()
    }
    catch(err)
    {
        return res.status(401).json({ err: 'Token invalid' })
    }

}
