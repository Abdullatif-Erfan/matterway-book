const puppeteer = require("puppeteer");
const fs = require("fs");
const { startScrapping } = require("./startScrapping");

// @route   GET books
// @desc    Get Books
// @access  Public
exports.getBooks = async (request, response) => {
  try {
    /* 1: check if file exists */
    let mainFile = "./books.json";
    if (fs.existsSync(mainFile)) {
      /* 2. check if file is empty */
      fs.readFile(mainFile, (err, file) => {
        if (file.length == 0) {
          console.log("File is empty, wait a minute to get the data ....");

          (async () => {
            /* Call startScrapping() method */
            var result = await startScrapping(mainFile);
            /* if scrapping successfully done, then return 1 as a success result and 0 as a failed result */
            if (result == 0) {
              sendFailedMessage(response, 201, "Error in Scrapping");
            } else {
              /* success result, call re-usable function readJsonFile() */
              readJsonFile(mainFile, response);
            }
          })();
        } else {
          /* file is not empty, and read the file */
          readJsonFile(mainFile, response);
        }
      });
    } else {
      /* file does not exist */
      sendFailedMessage(res, 202, "File does not exist");
    }
  } catch (err) {
    sendFailedMessage(res, 203, err);
  }
};

// @route   GET books/title
// @desc    Search a book by title
// @access  Public
exports.searchBook = async (request, response) => {
  const bookTitle = request.params.title + " books";
  const url = require("../config/keys").searchURL;
  const selectors = {
    searchBox: "#twotabsearchtextbox",
    bookLinks: `//span[@class='a-size-base-plus a-color-base a-text-normal']`,
    nextButton:
      '[class="s-pagination-item s-pagination-next s-pagination-button s-pagination-separator"]',
    addToCard: "#add-to-cart-button",
    HardCoverEdition: "#a-autoid-12-announce | #a-autoid-6-announce",
    // a-autoid-6-announce
    checkOutBtn: '[class="a-button-input"]'
  };

  let page = await configureBrowser(url, response);
  await page.setDefaultNavigationTimeout(0);
  /* prevent consuming more memory */
  await page.reload();
  console.log("Amazone Started Working ...");

  await page.type(selectors.searchBox, bookTitle);
  await page.keyboard.press("Enter");

  /** pagination */
  // const next =  await page.waitForSelector(selectors.nextButton);
  // await next.click();

  /* waitForXPath method will wait till to get book link, then will opent that link */
  await page.waitForXPath(selectors.bookLinks);
  /* $x => get all the array of Xpath and store it into book variable */
  const book = await page.$x(selectors.bookLinks);
  /* close to the searched book is at the top of the list */
  await book[0].click();

  /**
   * Kindle Edition will not go directly into add-to-card page
   * in order to go to add-to-card page, will click on HardCover link
   */
  try {
    const HardCoverEdition = await page.waitForSelector(
      selectors.HardCoverEdition
    );
    await HardCoverEdition.click();

    /*  add to the card  */
    const card = await page.waitForSelector(selectors.addToCard);
    await card.click();
  } catch {
    /*  add to the card  */
    const card = await page.waitForSelector(selectors.addToCard);
    await card.click();
  }

  /**
   * In order to click on checkout button, wee need to create account first
   * then, use checkout
   */
  const checkOut = await page.waitForSelector(selectors.checkOutBtn);
  await checkOut.click();
};

// Configure Browser
async function configureBrowser(url, response) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false
      // args: ['--start-fullscreen']
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
    response.json({ msg: "Could not create a browser instance" });
  }
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

// Reusable function for reading books.json file
function readJsonFile(mainFile, response) {
  fs.readFile(mainFile, "utf8", function(err, data) {
    if (err) {
      response.json({ message: "Error in reading file", data: err });
    }
    response.status(200).json({
      status: "Success",
      records: JSON.parse(data)
    });
  });
}

// Reusable function for sending error message
function sendFailedMessage(response, status, customMessage) {
  response.status(status).json({
    status: "failed",
    records: customMessage
  });
}
