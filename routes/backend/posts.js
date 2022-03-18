// include controllers
const c = require('../../controllers/posts')
const a = require('../../controllers/configposts')
const { verifyToken } = require('../../middleware/verifyToken')


const posts = app => {
    
    // get post by:idpost
    app.get('/api/admin/post/:id', verifyToken , async (req, res) => {
        response = await c.getPost(req.params)
        res.json(response)
    })

    // get post by:iduser
    app.get('/api/admin/posts/:iduser', verifyToken , async (req, res) => {
        response = await c.getPostUser(req.params)
        res.json(response)
    })

    // Input
    app.post('/api/admin/post', verifyToken , async (req, res) => {
        let process = await c.createPost(req.body)
        if(process.status == 'success') {
            let newid = process.id
            let set = await a.createConfigPost(req.body, newid)
            res.json(set)
        } else {
            res.json(process)
        }
    })

    // Update
    app.put('/api/admin/post', verifyToken , async (req, res) => {
        let process = await c.updatePost(req.body)
        if(process.status == 'success') {
            let id = process.id
            let del = await a.deleteConfigPost(id)
            let set = await a.updateConfigPost(req.body, id)
            res.json(set)
        } else {
            res.json(process)
        }
    })

    // Delete
    app.delete('/api/admin/post/:id', verifyToken , async (req, res) => {
        let process = await c.deletePost(req.params)
        res.json(process)
    })

}

module.exports = posts
