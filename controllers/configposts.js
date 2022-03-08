// include model
const models = require('../models')
const Configposts = models.configposts

// include lib
var S = require('string')

// controller create config postingan
exports.createConfigPost = (data, id) => new Promise((resolve, reject) => {  
    let count = Object.keys(data.config).length
    let config = [];
    for (i = 0; i < count; i++) {
        let name  = Object.keys(data.config)[i]
        let value = Object.values(data.config)[i]
        config[i] = {
            idpost  : id, 
            name    : name,
            value   : S(value).stripTags().s
        }
    }
    Configposts.bulkCreate(rm(config))
    .then((respond) => {
        resolve(
            convertToJson({
                status: 'success',
                pesan: 'Buat postingan baru berhasil dilakukan'
            })
        )
    })
    .catch((e) => {
        resolve(
            convertToJson(
                {
                    status: 'failed',
                    pesan:'Gagal membuat postingan yang baru, hubungi admin'
                }
            )
        )
        console.log(e)
    })
});


// controller update config postingan
exports.updateConfigPost = (data, id) => new Promise((resolve, reject) => {  
    let count = Object.keys(data.config).length
    
    let config = [];
    for (i = 0; i < count; i++) {
        let name  = Object.keys(data.config)[i]
        let value = Object.values(data.config)[i]
        config[i] = {
            idpost  : id, 
            name    : name,
            value   : S(value).stripTags().s
        }
    }
    Configposts.bulkCreate(rm(config))
    .then(() => {
        resolve(
            convertToJson({
                status: 'success',
                pesan: 'Update postingan baru berhasil dilakukan'
            })
        )
    })
    .catch((e) => {
        resolve(
            convertToJson(
                {
                    status: 'failed',
                    pesan:'Gagal mengupdate postingan yang baru, hubungi admin'
                }
            )
        )
        console.log(e)
    })
});

// controller delete config postingan
exports.deleteConfigPost = (id) => new Promise((resolve, reject) => {  
    Configposts.destroy({
        where: {
            idpost: id
        }
    })
    .then(() => {
        resolve(
            convertToJson({
                status: 'success',
                response: 'Delete config postingan berhasil dilakukan'
            })
        )
    })
    .catch((e) => {
        resolve(
            convertToJson(
                {status: 'failed', 
                response: 'Gagal melakukan delete config postingan'
            })
        )
        console.log(e)
    })
});



function convertToJson(strings) {
    let string = JSON.stringify(strings)
    return JSON.parse(string)
}

function rm(array) {
    return array.filter(x => x !== null)
}