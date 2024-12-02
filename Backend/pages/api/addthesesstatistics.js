import db from '../../lib/db';
import Cors from 'cors';

const cors = Cors({
  methods: ['POST'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
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

  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }

  const { thesis_id, type } = req.body;

  if (!thesis_id || !type || (type !== 'view' && type !== 'download')) {
    return res.status(400).json({ status: 'error', error: 'Invalid thesis_id or type' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM thesis_statistics WHERE thesis_id = ?', [thesis_id]);

    if (rows.length === 0) {
      await db.query(
        'INSERT INTO thesis_statistics (thesis_id, views, downloads) VALUES (?, ?, ?)',
        [thesis_id, 1, 0]
      );
    } else {
      const column = type === 'view' ? 'views' : 'downloads';
      const increment = type === 'view' ? 1 : 1;
      await db.query(`UPDATE thesis_statistics SET ${column} = ${column} + ? WHERE thesis_id = ?`, [
        increment,
        thesis_id,
      ]);
    }

    return res.status(200).json({ status: 'success', message: 'Statistics updated successfully' });
  } catch (error) {
    console.error('Error updating thesis statistics:', error);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
}
