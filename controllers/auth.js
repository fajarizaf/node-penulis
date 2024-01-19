// include model
const models = require('../models')
const Users = models.users

// include lib
var md5 = require('md5')
var jwt = require('jsonwebtoken')


// controller login
exports.Login = (data) => new Promise((resolve, reject) => { 

    Users.findAll({
        where:{
            emailuser :data.email
        }
    })
    .then((respond) => {
        if(respond != null) {
            if(md5(data.password) == respond[0].password) {

                const iduser = respond[0].id
                const nameuser = respond[0].nameuser
                const emailuser = respond[0].emailuser

                // generate access token
                const accessToken = jwt.sign({iduser,nameuser,emailuser}, 'asdasd3324sddfas23asdsgghzxvsdfaswrwrrwrwer', {
                    expiresIn: '20s'
                })
                // generate refresh token
                const refreshToken = jwt.sign({iduser,nameuser,emailuser}, '456wrwsdfrthdffghxcbxdfgeertetxcvcvsdfgeerrt', {
                    expiresIn: '1d'

                })

                // update token to db users
                Users.update({token:refreshToken},{
                    where: {
                        id: iduser
                    }
                })

                resolve(
                    convertToJson({
                        respond: {
                            status: 'success',
                            response: 'Login berhasil',
                            accessToken: accessToken,
                        },
                        refreshToken: {
                            value: refreshToken,
                        }
                    })
                )

            } else {
                resolve(
                    convertToJson({
                        respond: {
                            status: 'failed',
                            response: 'Password yang anda masukan salah'
                        } 
                    })
                )
            }
        }
    })
    .catch((e) => {
        resolve(
            convertToJson({
                respond: {
                    status: 'failed',
                    response: e.message
                }
            })
        )
        console.log(e)
    })
});


// controller register
exports.Register = (data) => new Promise((resolve, reject) => {   
    
    Users.create({
        nameuser: data.name,
        emailuser: data.email,
        idroles: data.idroles,
        password: md5(data.password)
    })

    .then((respond) => {
        resolve(
            convertToJson({
                status: 'success',
                response: 'Register berhasil dilakukan'
            })
        )
    })
    .catch((e) => {
        resolve(
            convertToJson({
                status: 'failed',
                response: e.errors[0].message
            })
        )
        console.log(e)
    })
});



// controller refresh token
exports.rtoken = (data) => new Promise((resolve, reject) => {

    const refreshToken = data.cookies.refreshToken
    console.log(refreshToken)
    
    Users.findAll({
        where :{
            token: refreshToken
        }
    })
    .then((res) => {
        if(!res[0].id) {
            resolve(convertToJson({status:"failed",respond:"no valid token"}))
        } else {
            // verifikasi existing refreshToken
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if(err) {
                    resolve(convertToJson({status:"failed",respond:"failed token verification"}))
                } else {

                    const iduser = res[0].id
                    const nameuser = res[0].nameuser
                    const emailuser = res[0].emailuser

                    // generate new access token
                    const accessToken = jwt.sign({iduser,nameuser,emailuser}, 'asdasd3324sddfas23asdsgghzxvsdfaswrwrrwrwer', {
                        expiresIn: '20s'
                    })
                    resolve(convertToJson({
                            status:"success",
                            response: "Generate new Access Token",
                            accessToken: accessToken
                    }))
                }
            })
        }
    })
    .catch((e) => {
        resolve(
            convertToJson(
                {status: 'failed'}
            )
        )
        console.log(e)
    })

})


// controller logout
exports.logout = (data) => new Promise((resolve, reject) => {

    const refreshToken = data.cookies.refreshToken
    Users.findAll({
        where :{
            token: refreshToken
        }
    })
    .then((res) => {
        if(!res[0].id) {
            resolve(convertToJson({status:"failed",respond:"no valid token"}))
        } else {
            const iduser = res[0].id
            Users.update({token: null}, {
                where: {
                    id:iduser
                }
            })
            resolve(convertToJson({
                status:"success",
                response: "Logout success"
            }))
        }
    })
    .catch((e) => {
        resolve(
            convertToJson(
                {status: 'failed'}
            )
        )
        console.log(e)
    })

})


function convertToJson(strings) {
    let string = JSON.stringify(strings)
    return JSON.parse(string)
}

function rm(array) {
    return array.filter(x => x !== null)
}