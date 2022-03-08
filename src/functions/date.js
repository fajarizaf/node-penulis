var dateTime = require('node-datetime')
var dt = dateTime.create()

const datenow = () => {
    return dt.format('Y-m-d H:I:S')
}

exports.datenow = datenow