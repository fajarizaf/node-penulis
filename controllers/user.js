// include model
const models = require('../models')
const Users = models.users

// include lib

// controller existing email users
exports.findEmail = (data) => new Promise((resolve, reject) => {
    Users.findOne({ 
        where: { emailuser: data.email },
        attributes  : ['id']
    })
    .then((respond) => { 
        if(respond != null) {
            let data = convertToJson(respond)
            resolve(data)
        } else {
            resolve(convertToJson({status:'failed'})) 
        } 
    })
    .catch((e) => { 
        resolve(convertToJson({
            status:'failed',
            response: e
        }))
        console.log(e)
    })
})


function convertToJson(strings) {
    let string = JSON.stringify(strings)
    return JSON.parse(string)
}
