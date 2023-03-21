'use strict';

const path = require('path');
const fs = require('fs').promises;

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

async function main(job) {
    console.log("converting document...")
    try{
        const ext = '.pdf'
        const inputPath = path.join(__dirname, '/src/temp/resume.docx');
        const outputPath = path.join(__dirname, `/src/final/${job.company}/resume${ext}`);

        // Read file
        const docxBuf = await fs.readFile(inputPath);

        // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
        let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
        
        // Here in done you have pdf file which you can save or transfer in another stream
        await fs.writeFile(outputPath, pdfBuf);
        console.log("converted!")
    }catch(err){
        console.log("this is poop")
        console.log(`Error converting file: ${err}`);
    }

}



module.exports = main
