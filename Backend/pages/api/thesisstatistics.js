import db from '../../lib/db';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*',
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed, only GET is accepted' });
  }

  try {
    const { thesis_id, user_id } = req.query;

    const [userRows] = await db.query('SELECT role FROM users WHERE user_id = ?', [user_id]);
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userRole = userRows[0].role;

    let query = `
      SELECT 
        ts.stat_id, ts.thesis_id, ts.views, ts.downloads,
        t.title, t.abstract, t.topic, t.author_id, t.year, t.keywords, t.file_url, t.email
      FROM 
        thesis_statistics ts
      JOIN 
        theses t
      ON 
        ts.thesis_id = t.thesis_id
      WHERE 
        1=1
    `;
    const queryParams = [];

    if (thesis_id) {
      query += ' AND ts.thesis_id = ?';
      queryParams.push(thesis_id);
    }

    if (userRole !== 'admin') {
      query += ' AND t.author_id = ?';
      queryParams.push(user_id);
    }

    const [rows] = await db.query(query, queryParams);


    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch thesis statistics, internal server error' });
  }
}
