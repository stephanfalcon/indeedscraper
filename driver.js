const {Builder, By, Key, until} = require('selenium-webdriver');

const Time = require("./time")

const prompt = require("prompt")

const time = new Time()

const prompter = async () =>{
  prompt.start()
  console.log("started")
  prompt.get(["phone"],(err,result)=>{
    console.log("command line input received:")
    
    return result
  })
}


async function example(url) {
  let driver = await new Builder().forBrowser('firefox').build();
  let job = {}
  try {

    await driver.get(url)
  
    await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div[2]/div/div[3]")),3000)

    var bannerCheck = await (await driver.findElements(By.xpath("/html/body/div[1]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[1]/img[1]"))).length > 0

    if(bannerCheck){
      job = {
      title : await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[3]/div[1]/div[1]/h1")).getText(),
      company : await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[3]/div[1]/div[2]/div/div/div/div[1]/div[2]/div/a")).getText(),
      pay : await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div/span[1]")).getText(),
      location : await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[3]/div[1]/div[2]/div/div/div/div[2]")).getText(),
    }
    }else{
      job = {
      title : await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[2]/div[1]/div[1]/h1")).getText(),
      company : await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div/div[1]/div[2]/div/a")).getText(),
      pay : await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[2]/div[2]/div[1]/div/span[1]")).getText(),
      location : await driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div[3]/div/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/div/div/div[2]/div')).getText()
      }
    }

    await driver.get("https://google.com")
    await driver.findElement(By.xpath("/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/input")).sendKeys(job.company,Key.RETURN)
    await driver.wait(until.elementLocated(By.id("result-stats")))
    const googleAd = await(await driver.findElements(By.id("tvcap"))).length > 0
    console.log(googleAd)
    if(googleAd){
      await driver.executeScript("return document.getElementById('tvcap').remove()")
    }
    await driver.findElement(By.css("#center_col h3")).click()

    job.website = await driver.getCurrentUrl()

    driver.quit()

  } finally {

  }
  return job
};

module.exports = example