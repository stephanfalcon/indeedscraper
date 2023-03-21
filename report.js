const db = require("./dbhandler")

async function exe () {
    result = await db.find()
    console.log(result)
}

exe()