const prompt = require("prompt")
const db = require("./dbhandler")
const Time = require("./time")

const writer = require("./docxtemplaterLocal/index")
const converter = require("./converter")

const time = new Time()



const prompter = async () =>{
    await prompt.start()
    result = await prompt.get(["title","company","pay","location","website","phone"])
    return await result
}


const manual = async ()=>{
    
        const job = await prompter()
    
        job.time = time.date.time.time
        job.date = time.date.calendar

        console.log(job)
        await writer(job)
        await converter(job)

}

manual()




