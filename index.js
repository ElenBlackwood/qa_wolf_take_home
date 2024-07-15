// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  await page.evaluate(() => {
    console.log("Navigated to Hacker News 'newest' page");
  });
  
  // Extract timestamps of the first 100 articles
  const articleDates = await page.$$eval('.itemlist .subtext', elements => {
    return elements.slice(0, 100).map(el => {
      const timeElement = el.querySelector('.age');
      return timeElement ? new Date(timeElement.getAttribute('title')) : null;
    }).filter(date => date !== null);
  });

  // Validate the order of timestamps
  let isSorted = true;
  for (let i = 0; i < articleDates.length - 1; i++) {
    if (articleDates[i] < articleDates[i + 1]) {
      isSorted = false;
      break;
    }
  }

  if (isSorted) {
    console.log("The first 100 articles are sorted from newest to oldest.");
  } else {
    console.log("The first 100 articles are NOT sorted from newest to oldest.");
  }

  // Close the browser
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();


// Edit the `index.js` file in this project to go to [Hacker News/newest](https://news.ycombinator.com/newest) and validate that the first 100 articles are sorted from newest to oldest. You can run your script with the `node index.js` command.

//Note that you are welcome to update Playwright or install other packages as you see fit.


