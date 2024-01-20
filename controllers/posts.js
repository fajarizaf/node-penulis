// include model
const models = require('../models')
const Posts = models.posts
const Users = models.users
const Catposts = models.catposts
const Configposts = models.configposts

// include lib
var slugify = require('slugify')
var S = require('string')


// controller admin get posts by:iduser
exports.getPostUser = (data) => new Promise((resolve, reject) => {
    Posts.findAll({ 
        where: { authorpost: data.iduser },
        attributes  : [
            ['id','idpost'],
            'titlepost',
            'contentpost',
            'tagpost',
            'slugpost',
            ['updatedAt','datepost']
        ],
        include: [
            { 
                model: Catposts, as: 'categori', 
                attributes : [
                    'id', 
                    ['namecat','name']
                ] 
            },
            { 
                model: Users, as: 'author', 
                attributes : [
                    'id',
                    ['nameuser','name']
                ] 
            },
        ]
    })
    .then((respond) => { 
        if(respond != null) {
            resolve(convertToJson(respond))
        } else {
            resolve(convertToJson({status:'failed'}))
        } 
    })
    .catch((e) => { 
        resolve(convertToJson({status:'failed'}))
        console.log(e)
    })
})

// controller admin get posts by:id
exports.getPost = (data) => new Promise((resolve, reject) => {
    Posts.findOne({ 
        where: { id: parseInt(data.id) },
        attributes  : [
            ['id','idpost'],
            'titlepost',
            'contentpost',
            'tagpost',
            'slugpost',
            ['updatedAt','datepost']
        ],
        include: [
            { 
                model: Catposts, as: 'categori', 
                attributes : [
                    'id', 
                    ['namecat','name']
                ] 
            },
            { 
                model: Configposts, as: 'config', 
                attributes : [
                    'name', 
                    'value',
                ] 
            }
        ]
    })
    .then((respond) => { 
        
        if(respond != null) {
            let data = convertToJson(respond)
            let config = {}
            data.config.map(item => {
                config[item.name] = item.value
            })
            data.config = config
            resolve(data)
        } else {
            resolve(convertToJson({status:'failed'})) 
        } 
    })
    .catch((e) => { 
        resolve(convertToJson({status:'failed', error: e.message}))
    })
})

// controller update postingan
exports.updatePost = (data) => new Promise((resolve, reject) => {
    var titlepost = data.titlepost
    Posts.update({
        titlepost: S(titlepost).stripTags().s,
        contentpost: data.contentpost,
        catpost: data.catpost,
        tagpost: data.tagpost,
        authorpost: data.authorpost,
        slugpost: slug(titlepost)
    },
    { where: {
        id: data.idpost 
    }
    })
    .then(() => {
        resolve(
            convertToJson({
                status: 'success',
                id: data.idpost
            })
        )
    })
    .catch((e) => {
        resolve(
            convertToJson({
                status: 'failed', 
                response: 'Gagal melakukan update postingan'
            })
        )
        console.log(e)
    })
})

exports.deletePost = (data) => new Promise((resolve, reject) => {
    Posts.destroy({
        where: {
            id: data.id
        }
    })
    .then(() => {
        resolve(
            convertToJson({
                status: 'success',
                response: 'Delete postingan berhasil dilakukan'
            })
        )
    })
    .catch((e) => {
        resolve(
            convertToJson(
                {status: 'failed', 
                response: 'Gagal melakukan delete postingan'
            })
        )
        console.log(e)
    })
})

// controller create postingan
exports.createPost = (data) => new Promise((resolve, reject) => {
    var titlepost = data.titlepost
    Posts.create({
        titlepost: S(titlepost).stripTags().s,
        contentpost: data.contentpost,
        catpost: data.catpost,
        tagpost: data.tagpost,
        authorpost: data.authorpost,
        slugpost: slug(titlepost)
    })
    .then((respond) => {
        resolve(
            convertToJson({
                status: 'success', 
                id: respond.id
            })
        )
    })
    .catch((e) => {
        resolve(
            convertToJson(
                {status: 'failed'}
            )
        )
        console.log(e)
    })
});


// public access controller
// controller public get posts by:id
exports.getPost_id = (data) => new Promise((resolve, reject) => {
    Posts.findAll({
        attributes  : [
            ['id','idpostss'],
            'titlepost',
            'contentpost',
            'tagpost',
            'slugpost',
            ['updatedAt','datepost']
        ],
        include: [
            { 
                model: Catposts, as: 'categori', 
                attributes : [
                    'id', 
                    ['namecat','name']
                ] 
            },
            { 
                model: Users, as: 'author', 
                attributes : [
                    'id',
                    ['nameuser','name']
                ] 
            },
        ]
    })
    .then((respond) => { 
        if(respond != null) {
            resolve(convertToJson(respond))
        } else {
            resolve(convertToJson({status:'failed'}))
        }
    })
    .catch((e) => { 
        resolve(convertToJson({status: 'failed'}))
        console.log(e)
    })
})


// public access controller
// controller public get posts by:slug
exports.getPost_slug = (data) => new Promise((resolve, reject) => {
    Posts.findOne({
        where       : { slugpost: data.slug },
        attributes  : [
            ['id','idpost'],
            'titlepost',
            'contentpost',
            'tagpost',
            'slugpost',
            ['updatedAt','datepost'],
            
        ],
        include: [
            { 
                model: Catposts, as: 'categori', 
                attributes : [
                    'id', 
                    ['namecat','name']
                ] 
            },
            { 
                model: Users, as: 'author', 
                attributes : [
                    'id',
                    ['nameuser','name']
                ] 
            },
            { 
                model: Configposts, as: 'config', 
                attributes : [
                    'name', 
                    'value',
                ] 
            }
        ]
    })
    .then((respond) => { 
        let data = convertToJson(respond)
        let config = {}
        data.config.map(item => {
            config[item.name] = item.value
        })
        data.config = config
        resolve(data)
    })
    .catch((e) => { 
        resolve(convertToJson({status: 'failed'}))
        console.log(e)
    })
})


function convertToJson(strings) {
    let string = JSON.stringify(strings)
    return JSON.parse(string)
}

function slug(string) {
    return slugify(S(string).stripTags().s, {replacement: '-', lower:true })
}