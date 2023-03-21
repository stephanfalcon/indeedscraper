const prompt = require("prompt")
const db = require("./dbhandler")
const Time = require("./time")
const writer = require("./docxtemplaterLocal/index")
const convert = require("./converter")

const time = new Time()

prompt.start()

prompt.get(["title","company","pay","location","website","phone","app"],async (err,result)=>{
    
    console.log("command line input received:")
    console.log(result)

    result.time = time.date.time.time
    result.date = time.date.calendar

    const dbResult = await db.insert(result)

    dbResult.forEach((data)=>{
        console.log(data)
    })
    await writer(result)
    await convert(result)
    db.close()
})
