const fs = require('fs');
const path = require('path');
const unzip = require("unzip-crx-3");
const vuejsDevToolsId = 'nhdogjmejiglipccpnnnanhbledajbpd';
const crx = path.join(__dirname, vuejsDevToolsId + '.crx');
const manifestFile = path.join(__dirname, 'extension/manifest.json');
const outDir = path.join(__dirname, 'extension');
const downloadCRX = require('download-crx');

downloadCRX.downloadById(vuejsDevToolsId, __dirname, vuejsDevToolsId).then(filePath => { 
  // console.log(`crx is located in ${filePath}`); 
  unzip(filePath, outDir).then(() => {
    // console.log(" - Successfully unzipped the crx file..");
    fs.unlinkSync(crx);
    // console.log(" - Reading Manifest file ...");
    fs.readFile(manifestFile, 'utf8', (err, data) => {
      if (err) return console.log(err);
      const toBeReplaced = `"file:///*",`;
      const replacement = `"file:///*","*://*/*",`;
      const result = data.replace(toBeReplaced, replacement);
      // console.log(" - Patching Vue DevTools manifest file...");
      fs.writeFile(manifestFile, result, 'utf8', (err) => {
        if (err) return console.log(err);
        console.log('[OK] Vue DevTools Extension successfully installed!');
      });
    });
  });
});