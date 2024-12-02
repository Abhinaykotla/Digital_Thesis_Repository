import db from '../../lib/db';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

  try {
    if (req.method === 'GET') {
      const { userId } = req.query;

      if (userId) {
        // Fetch specific user by ID
        const [rows] = await db.query('SELECT user_id, first_name, email FROM users WHERE user_id = ?', [userId]);
        if (rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(rows[0]);
      } else {
        // Fetch all users
        const [rows] = await db.query('SELECT user_id, first_name, email FROM users');
        res.status(200).json(rows);
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
