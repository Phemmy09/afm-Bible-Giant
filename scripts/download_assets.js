import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = {
  'ydd_hero.jpg': 'https://youth.afmweca.org/Landing%20Page%20Hero%20Section.jpg',
  'ydd_logo_hq.png': 'https://youth.afmweca.org/ydd.png',
  'ydd_footer_bg.png': 'https://youth.afmweca.org/BG-footer-desktop.png',
  'weca_logo.svg': 'https://apostolicfaithweca.org/themes/custom/afmweca_vbs4/logo.svg',
  'weca_camp_share.png': 'https://apostolicfaithweca.org/themes/custom/afmweca_vbs4/share-image.png',
  'portland_orchestra.jpg': 'https://cdn.prod.website-files.com/60f82ad12067d1d904335cc9/611d63e25e41985db18385b0_2021.04726-min-edited.jpg'
};

const targetDir = path.resolve('public/afc');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    });
    req.on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
    req.setTimeout(15000, () => {
      req.abort();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function run() {
  for (const [name, url] of Object.entries(assets)) {
    const dest = path.join(targetDir, name);
    try {
      console.log(`Downloading ${name} from ${url}...`);
      await download(url, dest);
      console.log(`✓ Saved ${name}`);
    } catch (e) {
      console.error(`✗ Failed ${name}: ${e.message}`);
    }
  }
}

run();
