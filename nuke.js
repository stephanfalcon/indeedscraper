const db = require("./dbhandler")

db.nuke((data)=>{
    console.log("database has been nuked...")
    console.log("nothing survived...")

    data.forEach((data)=>{
        console.log(data)
    })
})