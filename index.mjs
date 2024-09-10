/*

   _____                _           _   _             _______ ______ _            _           __  __  __       _                    _     _ _      
  / ____|              | |         | | | |           |__   __|  ____(_)          | |         / / |  \/  |     | |         /\       (_)   | (_)     
 | |     _ __ ___  __ _| |_ ___  __| | | |__  _   _     | |  | |__   _ _ __   ___| |__      / /  | \  / | ___ | |_ ___   /  \   ___ _  __| |_  ___ 
 | |    | '__/ _ \/ _` | __/ _ \/ _` | | '_ \| | | |    | |  |  __| | | '_ \ / __| '_ \    / /   | |\/| |/ _ \| __/ _ \ / /\ \ / __| |/ _` | |/ __|
 | |____| | |  __/ (_| | ||  __/ (_| | | |_) | |_| |    | |  | |    | | | | | (__| | | |  / /    | |  | | (_) | || (_) / ____ \ (__| | (_| | | (__ 
  \_____|_|  \___|\__,_|\__\___|\__,_| |_.__/ \__, |    |_|  |_|    |_|_| |_|\___|_| |_| /_/     |_|  |_|\___/ \__\___/_/    \_\___|_|\__,_|_|\___|
                                               __/ |                                                                                               
                                              |___/                                                                                                

*/
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import readline from 'readline';

async function scanPDF(filePath) {
  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes, {
    updateMetadata: false
  })

  // Un comment below to see all raw pdf data
  //console.log(pdfDoc);
  const catalog = pdfDoc.catalog;
  const pages = pdfDoc.getPages();

  let details = {
    hasJavaScript: false,
    hasOpenAction: false,
    hasAnnotations: false,
    annotationsOuput: [],
    hasEmbeddedFiles: false,
    pageCount: pages.length,
    isEncrypted: pdfDoc.isEncrypted,
    embeddedPages: false,
    embeddedFiles: false,
    idx: 0,
    idxPageLength: 0,
  };

  // Check for OpenAction when pdf is opened!
  const openAction = catalog.get('OpenAction');
  if (openAction) {
    details.hasOpenAction = true;
  }

  // Check for annotations output

  for (const page of pages) {
    const annotations = page.node.Annots;
    if (annotations) {
      details.hasAnnotations = true;
    }
  }

  if (pdfDoc.embeddedPages.length > 0){
    details.embeddedPages = true;
    }else{
        details.embeddedPages = false;
    }

  if (pdfDoc.embeddedFiles.length > 0){
    details.embeddedFiles = true;
    }else{
        details.embeddedFiles = false;
    }

  // Check for embedded files
  const embeddedFiles = catalog.get('EmbeddedFiles');
  if (embeddedFiles) {
    details.hasEmbeddedFiles = true;
  }

  // Check for JavaScript
  if (pdfDoc.javaScripts.length == 0) {
    details.hasJavaScript = false;
  }else{
    details.hasJavaScript = true;
 }
    console.log('----------------------------------------------------------------------');
    console.log('---------------------PDF Document Details:----------------------------');
    console.log('----------------------------------------------------------------------');
    console.log('Title:', pdfDoc.getTitle())
    console.log('Author:', pdfDoc.getAuthor())
    console.log('Subject:', pdfDoc.getSubject())
    console.log('Creator:', pdfDoc.getCreator())
    console.log('Producer:', pdfDoc.getProducer())
    console.log('Creation Date:', pdfDoc.getCreationDate())
    console.log('Modification Date:', pdfDoc.getModificationDate())
    console.log('Page Count:', pdfDoc.getPageCount());
    console.log('Annotations:', details.hasAnnotations);
    if (details.hasAnnotations == true) {

    for (details.idx = 0, details.idxPageLength = pages.length; details.idx < details.idxPageLength; details.idx++) {
        const page = pages[details.idx];
        //console.log('Page', details.idx + 1, 'Size:', page.getSize());
        details.annotationsOuput = page.node.Annots;
        console.log('Page', details.idx + 1, 'Size:', page.getSize());
        console.log('Annotations Page Output: ', details.idx + 1, 'Annotations:', details.annotationsOuput);
        }

    }

    console.log('----------------------------------------------------------------------');
    console.log('---------------------PDF Security Settings:---------------------------');
    console.log('----------------------------------------------------------------------'); 

    console.log("Is Encrypted:", details.isEncrypted);

    console.log('------------------------------------------------------------------------');
    console.log('Potential Security Risks Below:');
    console.log('------------------------------------------------------------------------');
    console.log('Action on Opening PDF (OpenAction):', details.hasOpenAction ? 'Yes' : 'No');
    if (details.hasJavaScript == false){
        console.log('JavaScript:', 'No');
    }else{
        console.log('JavaScript:', 'Yes');
        console.log('JavaScript Output:', pdfDoc.javaScripts);
    }

    if (details.embeddedPages == true){
        console.log('Embedded Pages:', details.embeddedPages);
        console.log('Embedded Pages Output:', pdfDoc.embeddedPages);
    }else{
        console.log('Embedded Pages:', details.embeddedPages);
    }

    if (details.embeddedFiles == true){
        console.log('Embedded Files:', details.embeddedFiles);
        console.log('Embedded Files Output:', pdfDoc.embeddedFiles);
    }else{
        console.log('Embedded Files:', details.embeddedFiles);
    }

}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('No need for qotations for spaces in file name, Enter the PDF file path: ', function (filePath) {
  scanPDF(filePath).catch(console.error).finally(() => rl.close());
});