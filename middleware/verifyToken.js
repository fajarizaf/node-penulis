const jwt = require('jsonwebtoken')

exports.verifyToken = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(token == null) {
            res.json({
                status: "failed", 
                response: "Authorization access token null"
            })
        } else {
            jwt.verify(token, 'asdasd3324sddfas23asdsgghzxvsdfaswrwrrwrwer', (err, decoded) => {
                if(err) {
                    res.json({status:"forbidden"})
                    console.log(err)
                } else {
                    req.email = decoded.email
                    next()
                }
            })
        } 
    } catch (error) {
        res.json({status:'forbidden'})
    }
}

