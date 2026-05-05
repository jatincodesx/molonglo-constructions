const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const LOGO_PATH = "/Users/jatinvohra/Downloads/Molonglo photos/logo_cropped-removebg-preview.png";

const IMAGE_FOLDER = '/Users/jatinvohra/Downloads/Molonglo photos/Sibsado street';

const OUTPUT_FOLDER = path.join(IMAGE_FOLDER, "watermarked");

if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
}

const supportedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

async function addWatermark() {
  const files = fs.readdirSync(IMAGE_FOLDER).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return supportedExtensions.includes(ext);
  });

  if (files.length === 0) {
    console.log("No supported image files found.");
    return;
  }

  for (const file of files) {
    const inputPath = path.join(IMAGE_FOLDER, file);

    const outputPath = path.join(
      OUTPUT_FOLDER,
      path.basename(file, path.extname(file)) + "_watermarked.jpg"
    );

    const imageMeta = await sharp(inputPath).metadata();

    const logoWidth = Math.round(imageMeta.width * 0.22);

    const resizedLogoBuffer = await sharp(LOGO_PATH)
      .resize({ width: logoWidth })
      .png()
      .toBuffer();

    const logoMeta = await sharp(resizedLogoBuffer).metadata();

    // Smaller number = closer to the top
    const topPadding = Math.round(imageMeta.height * 0.01);

    // Smaller number = closer to the right edge
    const rightPadding = Math.round(imageMeta.width * 0.02);

    const leftPosition = imageMeta.width - logoMeta.width - rightPadding;
    const topPosition = topPadding;

    await sharp(inputPath)
      .composite([
        {
          input: resizedLogoBuffer,
          left: leftPosition,
          top: topPosition,
          blend: "over"
        }
      ])
      .jpeg({ quality: 95 })
      .toFile(outputPath);

    console.log(`Watermarked: ${file}`);
  }

  console.log("");
  console.log("Done.");
  console.log(`Saved watermarked images in: ${OUTPUT_FOLDER}`);
}

addWatermark().catch((error) => {
  console.error("Error:", error.message);
});