const fs = require('fs');
const path = require('path');
const db = require('./db');

function toNullableNumber(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') return Number.isNaN(v) ? null : v;
  if (typeof v === 'string') {
    const trimmed = v.trim();
    if (trimmed === '' || trimmed.toLowerCase() === 'nan') return null;
    const n = Number(trimmed);
    return Number.isNaN(n) ? null : n;
  }
  return null;
}

async function main() {
  const fpath = path.join(__dirname, '..', 'US_recipes.json');
  if (!fs.existsSync(fpath)) {
    console.error('US_recipes.json not found at', fpath);
    process.exit(1);
  }

  const raw = fs.readFileSync(fpath, 'utf8');
  const data = JSON.parse(raw);
  const items = Object.keys(data).map(k => data[k]);

  console.log(`Found ${items.length} items. Starting insert...`);

  for (const item of items) {
    const cuisine = item.cuisine || null;
    const title = item.title || null;
    const rating = toNullableNumber(item.rating);
    const prep_time = toNullableNumber(item.prep_time);
    const cook_time = toNullableNumber(item.cook_time);
    const total_time = toNullableNumber(item.total_time);
    const description = item.description || null;
    const serves = item.serves || null;

    let nutrients = item.nutrients || null;
    if (nutrients && typeof nutrients !== 'object') {
      try { nutrients = JSON.parse(nutrients); } catch(e){ nutrients = null; }
    }

    try {
      await db.query(
        `INSERT INTO recipes (cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [cuisine, title, rating, prep_time, cook_time, total_time, description, nutrients, serves]
      );
    } catch (err) {
      console.error('Insert error for title=', title, err.message);
    }
  }

  console.log('Import finished.');
  process.exit(0);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});