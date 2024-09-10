# PDF Scanner

## Overview

This Node.js application reads a PDF file, scans its metadata, and outputs various details such as:

- **Title**, **Author**, **Subject**, **Creator**, and **Producer**
- **Creation** and **Modification** dates
- **Number of pages**
- Presence of **annotations**, **embedded files**, and **JavaScript code**
- Security settings such as **encryption** and **OpenAction triggers**

## Features

- **Metadata Extraction**: Extracts title, author, subject, creator, producer, and more.
- **Page Analysis**: Scans for the number of pages, annotations, embedded files, and JavaScript.
- **Security Checks**: Reports potential security risks, such as if the PDF has JavaScript or OpenAction triggers.

## How to Use

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed. You can verify your Node.js installation by running the following command:

```bash
node -v
```

###Installation
Clone or download this repository to your local machine.
Navigate to the project directory and install the necessary dependencies using npm:

```bash
git clone https://github.com/MotoAcidic/pdf-scanner.git
npm i
```

###Running the Application
Open a terminal in the directory where your index.mjs file is located.
Run the script using Node.js:

```bash
cd pdf-scanner
node index.mjs
```

The program will prompt you for the path to the PDF file. Enter the full path to the PDF file you want to scan. For example:

```bash
Enter the PDF file path: /path/to/your/file.pdf
```

You do not need to add quotation marks around the file path, even if it contains spaces.
After you enter the file path, the program will process the PDF and display its metadata and potential security risks.
Example Output
After running the program, you will see output similar to this:

```
---------------------------------------------------------------------- 
---------------------PDF Document Details:----------------------------
---------------------------------------------------------------------- 
Title: Some Title
Author: John Doe
Subject: PDF Scanning
Creator: Adobe Acrobat
Producer: Adobe PDF Library 15.0
Creation Date: 2021-04-10T09:22:01Z
Modification Date: 2021-04-12T11:18:01Z
Page Count: 12
Annotations: false
---------------------------------------------------------------------- 
---------------------PDF Security Settings:---------------------------
---------------------------------------------------------------------- 
Is Encrypted: false
------------------------------------------------------------------------ 
Potential Security Risks Below:
------------------------------------------------------------------------ 
Action on Opening PDF (OpenAction): No
JavaScript: No
Embedded Pages: false
Embedded Files: false
```

Additional Notes
If the PDF contains embedded files, JavaScript, or other security-sensitive content, it will be displayed under the "Potential Security Risks" section.
For any issues or troubleshooting, the program outputs detailed error messages to help track down any problems.
Un-comment Debugging Information
If you want to see the raw PDF data for debugging purposes, you can un-comment the following line inside the scanPDF function:

```
// console.log(pdfDoc);
```

This will display all raw PDF data in the console output.

License
This project is licensed under the MIT License.