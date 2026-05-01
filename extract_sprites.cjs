const fs = require('fs');
const path = require('path');
const http = require('https');
const { Jimp } = require('jimp');

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    http.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
};

const cropAndSave = async (img, coords, name, outputDir) => {
  const [left, top, width, height] = coords;
  const outPath = path.join(outputDir, `${name}.png`);
  const clone = img.clone();
  await clone.crop({ x: left, y: top, w: width, h: height }).write(outPath);
  console.log(`Saved ${name}.png`);
};

const main = async () => {
  const url = "https://raw.githubusercontent.com/wayou/t-rex-runner/gh-pages/assets/default_100_percent/100-offline-sprite.png";
  const sheetFilename = "100-offline-sprite.png";
  const outputDir = path.join(__dirname, 'public', 'dino-sprites');
  
  if (!fs.existsSync(outputDir)){
      fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log("Downloading sprite sheet...");
  await downloadImage(url, sheetFilename);
  console.log("Download complete. Cropping...");
  
  const img = await Jimp.read(sheetFilename);
  
  // coords are [left, top, width, height]
  

  
  // 10. HORIZON
  await cropAndSave(img, [2, 54, 1200, 14], "horizon", outputDir);
  
  console.log("Done extracting all sprites!");
};

main().catch(console.error);
