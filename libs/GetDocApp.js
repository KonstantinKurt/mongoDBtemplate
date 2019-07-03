const puppeteer = require('puppeteer');
const fs = require('fs');
const cheerio = require('cheerio');
const detailUrl = `https://editor.swagger.io/`;



(async () => {
     const filename = `swagger.json`;
     const docJSON = await JSON.parse(fs.readFileSync(filename,(err)=>{
        err && console.log(err.message);
     }));
     try
     {
          const browser = await puppeteer.launch({
               headless: false,
               width: 1800,
               height: 800,
               args: [
                    '217.12.49.197:1234',
               ]
          });
          const page = await browser.newPage();
          await page.setViewport({width: 1800, height: 800})
          await page.goto(detailUrl, {
               timeout: 15000
          });
          await page.waitForNavigation({waitUntil: 'domcontentloaded'});
          await page.evaluate(() => {
                document.getElementsByClassName(`ace_content`).innerHTML = docJSON;


          });
     }
     catch(err)
     {
          console.log(err.message);
     }


})();
