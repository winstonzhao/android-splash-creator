const fs = require('fs');
const puppeteer = require('puppeteer');

const schemata = [
  {
    viewport: {
      width: 480,
      height: 320
    },
    dir: 'drawable'
  },
  {
    viewport: {
      width: 800,
      height: 480
    },
    dir: 'drawable-land-hdpi'
  },
  {
    viewport: {
      width: 480,
      height: 320
    },
    dir: 'drawable-land-mdpi'
  },
  {
    viewport: {
      width: 1280,
      height: 720
    },
    dir: 'drawable-land-xhdpi'
  },
  {
    viewport: {
      width: 1600,
      height: 960
    },
    dir: 'drawable-land-xxhdpi'
  },
  {
    viewport: {
      width: 1920,
      height: 1080
    },
   dir: 'drawable-land-xxxhdpi' 
  },
  {
    viewport: {
      width: 480,
      height: 800
    },
    dir: 'drawable-port-hdpi'
  },
  {
    viewport: {
      width: 340,
      height: 480
    },
    dir: 'drawable-port-mdpi'
  },
  {
    viewport: {
      width: 720,
      height: 1280
    },
    dir: 'drawable-port-xhdpi'
  },
  {
    viewport: {
      width: 960,
      height: 1600
    },
    dir: 'drawable-port-xxhdpi'
  },
  {
    viewport: {
      width: 1280,
      height: 1920
    },
    dir: 'drawable-port-xxxhdpi'
  }
]

const takeScreenshots = async (url, observer) => {

  if (!fs.existsSync('out')) {
    fs.mkdirSync('out');
  }

  observer.next('Opening browser...')

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});

  for (const schema of Object.values(schemata)) {
    const path = `out/${schema.dir}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    observer.next(`Taking screenshot for ${schema.dir}...`)

    await page.setViewport(schema.viewport)
    await page.screenshot({path: `${path}/splash.png`});
  }
  
  await browser.close();
  observer.complete();
};

module.exports = takeScreenshots;