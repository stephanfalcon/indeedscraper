const handler = require("./dbhandler")

const document = process.argv[2]



const ex = async()=>{
    await handler.delete({company:document})
}   

ex()