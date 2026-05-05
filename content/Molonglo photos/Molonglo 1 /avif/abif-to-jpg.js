const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const INPUT_DIR = __dirname;
const OUTPUT_DIR = path.join(__dirname, "jpg_output");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

async function convertAvifToJpg() {
  const files = fs.readdirSync(INPUT_DIR).filter((file) =>
    file.toLowerCase().endsWith(".avif") ||
    file.toLowerCase().endsWith(".jpg.avif") ||
    file.toLowerCase().endsWith(".jpeg.avif")
  );

  if (files.length === 0) {
    console.log("No .avif files found in this folder.");
    return;
  }

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);

    let outputName = file
      .replace(/\.jpg\.avif$/i, ".jpg")
      .replace(/\.jpeg\.avif$/i, ".jpg")
      .replace(/\.avif$/i, ".jpg");

    const outputPath = path.join(OUTPUT_DIR, outputName);

    await sharp(inputPath)
      .jpeg({ quality: 95 })
      .toFile(outputPath);

    console.log(`Converted: ${file} → ${outputName}`);
  }

  console.log(`Done. JPG files saved in: ${OUTPUT_DIR}`);
}

convertAvifToJpg().catch((error) => {
  console.error("Error:", error.message);
});