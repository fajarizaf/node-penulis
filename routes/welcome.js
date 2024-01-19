

const welcome = app => {

    // get all data
    app.get('/', async (req, res) => {
        res.json({message: "api node penulis sudah ready"})
    })

}

module.exports = welcome
