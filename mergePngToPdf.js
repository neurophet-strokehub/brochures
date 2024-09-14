const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const { PNG } = require('pngjs');

// Path to the root directory containing PNG files
const imagesDir = 'C:/AAA/brochures/images/book/05-innk,teslab/tESLAB';

// Function to recursively get all PNG files from a directory and its subdirectories
function getPngFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(getPngFiles(filePath)); // Recurse into subdirectory
    } else if (path.extname(file).toLowerCase() === '.png') {
      results.push(filePath);
    }
  });

  return results;
}

// Function to read PNG files and convert them to PDF pages
async function mergePngToPdf() {
  const pdfDoc = await PDFDocument.create();
  const pngFiles = getPngFiles(imagesDir);

  for (const filePath of pngFiles) {
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
