const fs = require('fs');
const path = require('path');
const PDFMerger = require('pdf-merger-js');

const inputFolder = 'C:/AAA/brochures/images/book/01-neurophet-ko';
const outputPdf = path.join(inputFolder, 'merged.pdf');

async function mergePdfs() {
    const merger = new PDFMerger();
    const files = fs.readdirSync(inputFolder).filter(file => path.extname(file).toLowerCase() === '.pdf');

    for (const file of files) {
        const filePath = path.join(inputFolder, file);
        merger.add(filePath); // Add each PDF file to the merger
    }

    await merger.save(outputPdf); // Save the merged PDF
    console.log(`PDF 파일들이 병합되었습니다: ${outputPdf}`);
}

mergePdfs().catch(err => console.error(err));
