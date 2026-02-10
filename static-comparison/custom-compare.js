// command in terminal:  node custom-compare.js 

const fs = require('fs');
const PNG = require('pngjs').PNG;

const pixelmatchImport = require('pixelmatch');
const pixelmatch = pixelmatchImport.default || pixelmatchImport;
// mamke an images folder
const img1 = PNG.sync.read(fs.readFileSync('images/passing.png')); // Baseline
const img2 = PNG.sync.read(fs.readFileSync('images/failing.png')); // Actual (Failing)

const { width, height } = img1;
const diff = new PNG({ width, height });

const numDiffPixels = pixelmatch(
    img1.data, img2.data, diff.data, width, height, 
    {
        threshold: 0.1,           // Sensitivity (0.1 is standard)
        diffColor: [255, 0, 0], // RGB for YELLOW [Red, Green, Blue]
        alpha: 0.8,               // 0.8 = Show the original image clearly in background
        diffMask: false           // false = Draw differences ON TOP of the image
    }
);


fs.writeFileSync('diff-image.png', PNG.sync.write(diff));

console.log(`Diff generated! ${numDiffPixels} pixels different.`);
console.log('Check diff-image.png to see the red highlights.');