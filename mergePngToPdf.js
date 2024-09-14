const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');
const { PNG } = require('pngjs');

// Path to the directory containing PNG files
const imagesDir = 'C:/AAA/brochures/images/book/04-AQUAPEDI-ENG';

// Function to read PNG files and convert them to PDF pages
async function mergePngToPdf() {
  const pdfDoc = await PDFDocument.create();

  // Read all PNG files from the directory
  const files = fs.readdirSync(imagesDir).filter(file => path.extname(file).toLowerCase() === '.png');

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const pngData = fs.readFileSync(filePath);

    // Load PNG data
    const png = PNG.sync.read(pngData);

    // Create a new page in the PDF document
    const page = pdfDoc.addPage([png.width, png.height]);

    // Draw the PNG image onto the page
    const image = await pdfDoc.embedPng(pngData);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: png.width,
      height: png.height,
    });
  }

  // Serialize the PDF document to bytes
  const pdfBytes = await pdfDoc.save();

  // Save the PDF to a file
  fs.writeFileSync('merged.pdf', pdfBytes);
  console.log('PDF created successfully!');
}

// Run the function
mergePngToPdf().catch(err => console.error(err));
