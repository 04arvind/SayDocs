const https = require('https');
const fs = require('fs');
const path = require('path');

const fonts = [
  // Removed non-Latin fonts: Devanagari, SC, JP, Arabic
];

function downloadFont(font) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, font.name));
    https.get(font.url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`${font.name} downloaded`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(__dirname, font.name));
      reject(err);
    });
  });
}

function convertToBase64(fontName) {
  const filePath = path.join(__dirname, fontName);
  const fileBuffer = fs.readFileSync(filePath);
  const base64 = fileBuffer.toString('base64');
  return base64;
}

async function main() {
  for (const font of fonts) {
    try {
      await downloadFont(font);
      const base64 = convertToBase64(font.name);
      console.log(`${font.name} base64: ${base64.substring(0, 100)}...`);
      // Save to a file or something
      fs.writeFileSync(path.join(__dirname, font.name.replace('.ttf', '.js')), `export const ${font.name.replace('-Regular.ttf', '').replace('NotoSans', 'notoSans')}Base64 = "${base64}";`);
    } catch (err) {
      console.error(`Error with ${font.name}: ${err.message}`);
    }
  }
}

main();
