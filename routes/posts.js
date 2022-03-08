// include controllersss
const c = require('../controllers/posts')
const { verifyToken } = require('../middleware/verifyToken')

const posts = app => {

    // get all data
    app.get('/api/posts', async (req, res) => {
        let response = await c.getPost_id(req.params);
        res.json(response)
    })

    // Get by slug
    app.get('/api/post/:slug', async (req, res) => {
        let getdata = []
        getdata[0] = await c.getPost_slug(req.params)
        res.json(getdata)
    })

}

module.exports = posts
