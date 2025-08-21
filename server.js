const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/recipes', async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  const offset = (page - 1) * limit;

  try {
    const totalRes = await db.query('SELECT COUNT(*) FROM recipes');
    const total = parseInt(totalRes.rows[0].count, 10);

    const dataRes = await db.query(
      `SELECT id, title, cuisine, rating, prep_time, cook_time, total_time, description, nutrients, serves
       FROM recipes
       ORDER BY rating DESC NULLS LAST
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    res.json({ page, limit, total, data: dataRes.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

function parseOperatorParam(s) {
  if (!s) return null;
  s = String(s).trim();
  const m = s.match(/^(>=|<=|>|<|=)?\s*(.+)$/);
  if (!m) return null;
  const op = m[1] || '=';
  const val = m[2];
  return { op, val };
}

app.get('/api/recipes/search', async (req, res) => {
  try {
    const wheres = [];
    const params = [];

    if (req.query.title) {
      params.push(`%${req.query.title}%`);
      wheres.push(`title ILIKE $${params.length}`);
    }
    if (req.query.cuisine) {
      params.push(`%${req.query.cuisine}%`);
      wheres.push(`cuisine ILIKE $${params.length}`);
    }
    if (req.query.rating) {
      const parsed = parseOperatorParam(req.query.rating);
      if (parsed) {
        const n = Number(parsed.val);
        if (!Number.isNaN(n)) {
          params.push(n);
          wheres.push(`rating ${parsed.op} $${params.length}`);
        }
      }
    }
    if (req.query.total_time) {
      const parsed = parseOperatorParam(req.query.total_time);
      if (parsed) {
        const n = Number(parsed.val);
        if (!Number.isNaN(n)) {
          params.push(n);
          wheres.push(`total_time ${parsed.op} $${params.length}`);
        }
      }
    }
    if (req.query.calories) {
      const parsed = parseOperatorParam(req.query.calories);
      if (parsed) {
        const n = Number(parsed.val);
        if (!Number.isNaN(n)) {
          params.push(n);
          wheres.push(`(regexp_replace(coalesce(nutrients->>'calories',''), '[^0-9.-]', '', 'g'))::float ${parsed.op} $${params.length}`);
        }
      }
    }

    let sql = `SELECT id, title, cuisine, rating, prep_time, cook_time, total_time, description, nutrients, serves
               FROM recipes`;
    if (wheres.length) sql += ' WHERE ' + wheres.join(' AND ');
    sql += ' ORDER BY rating DESC NULLS LAST';
    sql += ' LIMIT 1000';

    const qres = await db.query(sql, params);
    res.json({ data: qres.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('API listening on', port));