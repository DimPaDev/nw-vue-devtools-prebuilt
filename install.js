const fs = require('fs');
const path = require('path');
const { crxDownload } = require('chrome-extension-downloader');
const unzip = require("unzip-crx");
const vuejsDevToolsId = 'nhdogjmejiglipccpnnnanhbledajbpd';
const crx = path.join(__dirname, vuejsDevToolsId + '.crx');
const manifestFile = path.join(__dirname, 'extension/manifest.json');
const outDir = path.join(__dirname, 'extension');

crxDownload(vuejsDevToolsId).then(buffer => {
	console.log(' - Found Vue.js DevTools Crx Extension');
	fs.writeFile(crx, buffer, err => {
	  if (err) throw err;
		console.log(' - Saved Crx File!');
		unzip(crx, outDir).then(() => {
			console.log(" - Successfully unzipped the crx file..");
			fs.unlinkSync(crx);
			console.log(" - Reading Manifest file ...");
			fs.readFile(manifestFile, 'utf8', (err, data) => {
				if (err) return console.log(err);
				const toBeReplaced = `"file:///*",`;
				const replacement = `"file:///*","*://*/*",`;
				const result = data.replace(toBeReplaced, replacement);
				console.log(" - Patching Vue DevTools manifest file...");
				fs.writeFile(manifestFile, result, 'utf8', (err) => {
					if (err) return console.log(err);
					console.log('[OK] Done');
				});
			});
		});
	});
});
