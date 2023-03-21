const {Builder,By,Key,until} = require('selenium-webdriver')

const getElement = async (driver,css) => {
    const exists = await elementExists(driver,css)
    if(!exists){
        return new Promise((resolve,reject)=>{setTimeout(async ()=>{
            const exists = await elementExists(driver,css)
            console.log(exists)
            if(exists!=0){
                console.log('element exists')
                const element = await driver.findElement(By.css(css)).getText()
                resolve(element)
            }else{
                resolve("No data")
            }
        },2000)})
        .then((value)=>{
            return value
        })
    }else{
        const element = await driver.findElement(By.css(css)).getText()
        return element
    }
}

const getElementById = async (driver,id) => {
    const exists = await(await driver.findElements(By.id(id))).length
    if (exists) {
        const element = await driver.findElement(By.id(id)).getText()
        return element
    }else{
        return "No data"
    }
}

const elementExists = async (driver,css)=>{
    const exists = await(await driver.findElements(By.css(css))).length
    console.log(`element at ${css} is: ${exists}`)
    return exists
}

const filterContainer = (text,contains) => {
    return text.findIndex((line)=>{
        return line.includes(contains)
    })
}

const getLocation = async (container) => {
    const array = filterContainer(container,'reviews')
    if(array===1){
        return container[2].replace(/.*(?<=in )/gi,"")
    }
    return container[1].replace(/.*(?<=in )/gi,"")
}

const getCompany = async (container) => {
    return container[0]
}

async function drive (url) {
    let driver = await new Builder().forBrowser('firefox').build()
    let job = {}

    try {
        await driver.get(url)
        const infoContainer = await(await getElement(driver,'.jobsearch-CompanyInfoContainer')).toString().split('\n')

        job.title = await getElement(driver,'.jobsearch-JobInfoHeader-title')
        job.company = await getCompany(infoContainer)
        job.location = await getLocation(infoContainer)
        job.pay = await getElement(driver,'.css-2iqe2o')
    }catch(error){
        console.log('there was an error')
        console.log(error)
    }
    
    job.app = url

    await driver.get("https://google.com")

    await driver.findElement(By.xpath("/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input")).sendKeys(job.company,Key.RETURN)
    // await driver.findElement(By.xpath("/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input")).sendKeys('Resort Lifestyle Communities',Key.RETURN)

    await driver.wait(until.elementLocated(By.id("result-stats")))
    
    // driver.wait(until.elementLocated(By.css('.LrzXr.zdqRlf.kno-fv')))
    
    // .then()
    job.phone = await getElement(driver,'.LrzXr.zdqRlf.kno-fv')

    const googleAd = await(await driver.findElements(By.id("tvcap"))).length > 0

    if(googleAd){
      await driver.executeScript("return document.getElementById('tvcap').remove()")
    }

    await driver.findElement(By.css("#center_col h3")).click()

    job.website = await driver.getCurrentUrl()

    driver.close()
    
    // console.log(job)

    return job
}

// drive('https://www.indeed.com/viewjob?jk=f5773f4a064dd319&tk=1gpoakkp6i0df801&from=hp')

module.exports = drive
