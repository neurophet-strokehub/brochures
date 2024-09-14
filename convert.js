const fs = require('fs-extra');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const { PNG } = require('pngjs');

// Path to the directory containing PNG files
const imagesDirectory = 'C:/AAA/brochures/images/book/03-AQUAAD-ENG';
// Output PDF path
const outputPdfPath = 'C:/AAA/brochures/images/book/03-AQUAAD-ENG/output.pdf';

const MAX_PAGE_WIDTH = 6000;  // Set a maximum width
const MAX_PAGE_HEIGHT = 6000; // Set a maximum height

async function convertPngsToPdf() {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const files = await fs.readdir(imagesDirectory);

  // Filter PNG files
  const pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

  for (const file of pngFiles) {
    const filePath = path.join(imagesDirectory, file);

    // Read the PNG file
    const pngData = await fs.readFile(filePath);
    const pngImage = await pdfDoc.embedPng(pngData);

    // Get image dimensions
    const { width: imgWidth, height: imgHeight } = pngImage.size;

    if (isNaN(imgWidth) || isNaN(imgHeight)) {
      console.error(`Invalid dimensions for image: ${file}`);
      continue;
    }

    // Calculate scaling factor
    const scale = Math.min(MAX_PAGE_WIDTH / imgWidth, MAX_PAGE_HEIGHT / imgHeight);

    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;

    if (isNaN(scaledWidth) || isNaN(scaledHeight)) {
      console.error(`Calculated invalid dimensions for image: ${file}`);
      continue;
    }

    // Create a new page with scaled dimensions
    const page = pdfDoc.addPage([scaledWidth, scaledHeight]);

    // Draw the image on the page, centered
    page.drawImage(pngImage, {
      x: (scaledWidth - imgWidth * scale) / 2,
      y: (scaledHeight - imgHeight * scale) / 2,
      width: imgWidth * scale,
      height: imgHeight * scale,
    });
  }

  // Serialize the PDF document to bytes
  const pdfBytes = await pdfDoc.save();

  // Ensure output directory exists
  const outputDir = path.dirname(outputPdfPath);
  await fs.ensureDir(outputDir);

  // Write the PDF to a file
  await fs.writeFile(outputPdfPath, pdfBytes);
  console.log(`PDF created successfully at ${outputPdfPath}`);
}

convertPngsToPdf().catch(err => console.error(err));
