const puppeteer = require("puppeteer");
const fs = require("fs");

async function startScrapping(mainFile) {
  /** Flag for returning result */
  let result = 0;
  const url = require("../config/keys").scrappingURL;
  /** Configure browser */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  /** define parent class name */
  const bookHandles = await page.$$(".categoryContainer > .category");
  let items = [];

  /** loop thru all book */
  for (const bookhandle of bookHandles) {
    let title = "NULL";
    let image = "NULL";
    try {
      title = await page.evaluate(
        b =>
          b
            .querySelector("h4.category__copy")
            .textContent.replace(/[\n\r]+|[\s]{2,}/g, " ")
            .trim(),
        bookhandle
      );
    } catch (error) {
      console.log("Title Error:", error);
    }

    try {
      image = await page.evaluate(
        b => b.querySelector("img.category__winnerImage").getAttribute("src"),
        bookhandle
      );
    } catch (error) {
      console.log("Image Error:", error);
    }

    /**  check if it book has image */
    if (image !== "NULL") {
      items.push({ title: title, image: image });
    }
  }

  /** check if items array has more then a book */
  if (items.length >= 1) {
    result = 1;
    fs.writeFile(mainFile, JSON.stringify(items, null, 4), err => {
      if (err) {
        console.error(err);
      }
      console.log("Books has been added");
    });
  } else {
    result = 0;
    console.log("No book found in list");
  }
  // console.log(result);
  return await result;

  /** close the browser */
  await browser.close();
}
exports.startScrapping = startScrapping;
