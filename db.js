const { MongoClient } = require('mongodb');
require('dotenv').config()
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// fzymx2525


// const url = 'mongodb+srv://admin:fzymx2525@cluster0.jkwoamt.mongodb.net/?retryWrites=true&w=majority';

console.log("db url",process.env.DBURL)

const url = process.env.DBURL

const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

// connect to mongo client that is being served
client.connect()



// connect to specific called files
const database = client.db("files")

// connect to specific collection call documents
const docs = database.collection("documents")

// database methods to be exported
const db = {
    remove : async (document) =>{
        const result = await docs.deleteOne(document)
        return result
    },
    insert  : async (document)=>{
        const result = await docs.insertOne(document)
        return result
    },
    
    find : async (document)=>{
        const result = await docs.find(document)
        const dataArr = []

        await result.forEach((data)=>{
            dataArr.push(data)
        })

        return dataArr
    },

    replace: async (document,newDoc)=>{
        const result = await docs.replaceOne({_id:document._id},{})
    },

    nuke: async ()=> {
        await docs.deleteMany()
    },

    close: async () => {
        client.close()
    }

}

module.exports = db