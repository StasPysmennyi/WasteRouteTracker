'use strict';

const fs = require('fs');
const path = require('path');

const CONCURRENT = 10;
const SAVE_EVERY = 50;
const JELGAVA_LNG = 23.7115;
const JELGAVA_LAT = 56.6511;

const sourcePath = path.join(__dirname, 'routes.source.json');
const cachePath = path.join(
  __dirname,
  '..',
  'src',
  'assets',
  'data',
  'geocodingCache.json',
);
const envPath = path.join(__dirname, '..', '.env');

const loadEnv = () =>
  fs
    .readFileSync(envPath, 'utf8')
    .split('\n')
    .reduce((acc, line) => {
      const [key, ...rest] = line.split('=');
      if (key && rest.length) {
        acc[key.trim()] = rest.join('=').trim();
      }
      return acc;
    }, {});

// Mirrors src/api/geocodingApi.ts cleanAddressForGeocoding
const cleanAddress = address =>
  address.replace(/\([^)]*\)/g, '').split(/[/;]/)[0].trim();

const fetchCoordinate = async (cleaned, token) => {
  const query = encodeURIComponent(`${cleaned}, Jelgava, Latvia`);
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json` +
    `?access_token=${token}&limit=1&country=lv` +
    `&proximity=${JELGAVA_LNG},${JELGAVA_LAT}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const [lng, lat] = data?.features?.[0]?.center ?? [];
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return null;
    }
    return { latitude: lat, longitude: lng };
  } catch {
    return null;
  }
};

const main = async () => {
  const env = loadEnv();
  const token = env.MAPBOX_ACCESS_TOKEN;
  if (!token || token.startsWith('your_')) {
    console.error('MAPBOX_ACCESS_TOKEN not set in .env');
    process.exit(1);
  }

  const { routes } = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const rawAddresses = [
    ...new Set(routes.flatMap(r => r.stops.map(s => s.a))),
  ];

  const cache = fs.existsSync(cachePath)
    ? JSON.parse(fs.readFileSync(cachePath, 'utf8'))
    : {};

  // Group raw addresses by cleaned query — one API call per unique query
  const byClean = rawAddresses.reduce((acc, raw) => {
    const cleaned = cleanAddress(raw);
    if (!acc[cleaned]) {
      acc[cleaned] = [];
    }
    acc[cleaned].push(raw);
    return acc;
  }, {});

  const pending = Object.keys(byClean).filter(
    cleaned => !byClean[cleaned].every(raw => raw in cache),
  );

  console.log(`Total unique addresses : ${rawAddresses.length}`);
  console.log(`Unique Mapbox queries  : ${Object.keys(byClean).length}`);
  console.log(`Already cached         : ${rawAddresses.length - pending.reduce((s, c) => s + byClean[c].length, 0)}`);
  console.log(`API calls needed       : ${pending.length}`);
  console.log(`Concurrent             : ${CONCURRENT}`);
  console.log(`Estimated time         : ~${Math.round((pending.length / CONCURRENT) * 0.15 / 60)} min\n`);

  if (pending.length === 0) {
    console.log('Nothing to do — cache is complete.');
    return;
  }

  let done = 0;
  for (let i = 0; i < pending.length; i += CONCURRENT) {
    const batch = pending.slice(i, i + CONCURRENT);
    const results = await Promise.all(
      batch.map(cleaned => fetchCoordinate(cleaned, token)),
    );

    batch.forEach((cleaned, idx) => {
      byClean[cleaned].forEach(raw => {
        cache[raw] = results[idx];
      });
    });

    done += batch.length;
    const save = done % SAVE_EVERY < CONCURRENT || done >= pending.length;
    if (save) {
      fs.writeFileSync(cachePath, JSON.stringify(cache));
    }
    process.stdout.write(
      `\r[${done}/${pending.length}] ${save ? 'saved' : '     '}`,
    );
  }

  console.log('\n\nDone!');
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
