// include controllers
const authentication = require('../controllers/auth')
const user = require('../controllers/user')

//include lib

const auth = app => {

    // Login
    app.post('/api/auth/login', async (req, res) => {
        let process = await authentication.Login(req.body)

        // success login deliver cookie refreshToken to client
        if(process.respond.status == 'success') {
            res.cookie('refreshToken', process.refreshToken.value, {
                httpOnly: true,
                sameSite: "none",
                secure: "false",
                maxAge: 24 * 60 * 60 * 1000
            })
        }

        res.json(process.respond)
    })

    // Register
    app.post('/api/auth/register', async (req, res) => {
        if(req.body.password != '') {
            let find = await user.findEmail(req.body)
            if(find.id == null) {
                let process = await authentication.Register(req.body)
                res.json(process)
            } else {
                res.json({
                    status:'failed',
                    response: 'Email telah terdaftar sebelumnya'
                })
            }
        } else {
            res.json({
                status:'failed',
                response: 'Password tidak boleh kosong'
            })
        }
    })

    // Refresh Token
    app.get('/api/auth/rtoken', async (req, res) => {
        let process = await authentication.rtoken(req)
        res.json(process)
    })

    // logout
    app.get('/api/auth/logout', async (req, res) => {
        let process = await authentication.logout(req)
        // destroy cookies
        if(process.status == 'success') {
            res.clearCookie('refreshToken')
        }
        res.json(process)
    })
}

module.exports = auth
