const fs = require('fs');
const path = require('path');
const unzip = require("unzip-crx-3");
const vuejsDevToolsId = 'nhdogjmejiglipccpnnnanhbledajbpd';
const crx = path.join(__dirname, vuejsDevToolsId + '.crx');
const manifestFile = path.join(__dirname, 'extension/manifest.json');
const pkgFile = path.join(__dirname, 'extension/package.json');
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
      const result = data.replace(
        `"file:///*",`, 
        `"file:///*","<all_urls>",`
      );
      // console.log(" - Patching Vue DevTools manifest file...");
      fs.writeFile(manifestFile, result, 'utf8', (err) => {
        if (err) return console.log(err);
        if (fs.existsSync(pkgFile)) fs.unlinkSync(pkgFile);
        console.log('[OK] Vue DevTools Extension successfully installed!');
      });
    });
  });
});
