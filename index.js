// const driver = require("./driver")
const driver = require("./testDrive")
const dbhandler = require("./dbhandler")
const writer = require("./docxtemplaterLocal/index")
const converter = require("./converter")
const prompt = require("prompt")
const Time = require("./time")
const time = new Time()
require('dotenv').config()

const url = "https://www.indeed.com/viewjob?jk=08c1f68c87d7355a&tk=1gs3498j7m8pn801&from=hp&advn=4983325339589150&adid=409152176&ad=-6NYlbfkN0DuMP8jU5tGhZAMKALCg4VKAZkn690Lo4NrrKFiQabAxxBZWS6mY9MYuHS-ikb3KpUiOZfcV0m4E6XYHfYz4IeW9_BgNdeT18YHiA1NKoo7sYekOgnE_XS01JXXRDkVRYf8Mdvkn3WY4RqKj8RsEFw7yE38PegoOWPEgisIGhvsGuXDb5T5DVQn2HQsoarOu-DxoTHNPbwO8L4W29Bitaj-OOBkBRh3FNmi5KajfEpl_eU35bsomdIJszGqrY0sVawRdh_l-zgFHcbGvwqrlVH1j4pOf2XQ1iTbXoP9b9HKQ3LbtD76CTBCn3hnm4mMmjU5akjQRd8PXwNMJqtefPq0YzA0ZE3QdLDjkqfrSZJkatx7HhfCFN9e4XFvZuPCXeCrVZJCvWkFywvXJI0hV_MSY1ohHSZINkCJ495dt6cjglz4VaqHoVnvvdLZr2jI59Lf_HzI1rOw9jztuYpq09W1qpoSmX0aS-JIgvq_DqSGbsfczButFNwz&pub=4a1b367933fd867b19b072952f68dceb&xkcb=SoD2-_M3RDB9BbQtLZ0LbzkdCdPP&vjs=3"

const prompter = async ()=>{
    prompt.start()
    result = await prompt.get(["phone"])
    return result.phone
}

const main = async (url)=>{
    console.log('main')
    const job = await driver(url)
    // job.phone = await prompter()
    job.time = time.date.time.time
    job.date = time.date.calendar
    job.app = url
    console.log(job)
    await dbhandler.insert(job)
    await writer(job)
    converter(job)
    .then(()=>{
        console.log('should be closing db')
       dbhandler.close()
    })
    
    return
}

const fullTest = async (url)=>{
    console.log('fullTest')
    const job = await driver(url)
    // job.phone = await prompter()
    job.time = time.date.time.time
    job.date = time.date.calendar
    job.app = url
    console.log('job from index: ',job)
    // await dbhandler.insert(job)
    await writer(job)
    await converter(job)
    dbhandler.close()
    return
}

const switcher = (command) => {
    if(command==1){
        console.log('command: ',command)
        main(url)
    }else if(command==2){
        console.log('command: ',command)
        fullTest(url)
    }
    // return switcherObj[command]
    
}

switcher(process.argv[2])
