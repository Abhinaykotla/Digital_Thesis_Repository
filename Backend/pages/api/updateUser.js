import db from '../../lib/db';
import Cors from 'cors';

const cors = Cors({
  methods: ['PUT'],
  origin: '*', // You can replace '*' with specific domains like 'http://localhost:3000' for more security
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

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { first_name, email, phone, bio, id } = req.body;

    // Update user in the database
    const [result] = await db.query(
      'UPDATE users SET first_name = ?, email = ?, phone = ?, bio = ? WHERE user_id = ?',
      [first_name, email, phone, bio, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
