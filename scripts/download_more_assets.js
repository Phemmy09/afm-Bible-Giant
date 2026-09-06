import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = {
  'ydd_teen_ministry.jpg': 'https://youth.afmweca.org/_next/static/media/Teenage%20Ministry.8d3a52e4.jpg',
  'ydd_campus_fellowship.jpg': 'https://youth.afmweca.org/_next/static/media/Campus%20Fellowship.742195a8.jpg',
  'ydd_young_professionals.jpg': 'https://youth.afmweca.org/_next/static/media/Young%20Professionals.6e349018.jpg',
  'ydd_young_couples.jpg': 'https://youth.afmweca.org/_next/static/media/Young%20Couples.016625f7.jpg',
  'ydd_singles_forum.jpg': 'https://youth.afmweca.org/_next/static/media/Singles%20Forum.4813cb8f.jpg'
};

const targetDir = path.resolve('public/afc');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
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
      console.log(`Downloading ${name}...`);
      await download(url, dest);
      console.log(`✓ Saved ${name}`);
    } catch (e) {
      console.error(`✗ Failed ${name}: ${e.message}`);
    }
  }
}

run();
