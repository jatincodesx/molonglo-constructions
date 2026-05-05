const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const INPUT_DIR = __dirname;
const OUTPUT_DIR = path.join(__dirname, "jpg_output");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

async function convertWebpToJpg() {
  const files = fs.readdirSync(INPUT_DIR).filter(file =>
    file.toLowerCase().endsWith(".webp")
  );

  if (files.length === 0) {
    console.log("No .webp files found in this folder.");
    return;
  }

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputName = path.basename(file, ".webp") + ".jpg";
    const outputPath = path.join(OUTPUT_DIR, outputName);

    await sharp(inputPath)
      .jpeg({ quality: 95 })
      .toFile(outputPath);

    console.log(`Converted: ${file} → ${outputName}`);
  }

  console.log(`Done. JPG files saved in: ${OUTPUT_DIR}`);
}

convertWebpToJpg().catch(console.error);