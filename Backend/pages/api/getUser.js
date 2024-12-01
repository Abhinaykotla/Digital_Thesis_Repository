import db from '../../lib/db';
import jwt from 'jsonwebtoken';
import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'], // Allow only specific methods
  origin: '*', // You can replace '*' with specific domains like 'http://localhost:3000' for more security
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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Query to get user details along with the count of applied jobs
    const query = `
      SELECT u.user_id, u.email, u.first_name, u.last_name, u.*,
             COUNT(ja.job_id) AS jobs_applied
      FROM users u
      LEFT JOIN job_applications ja ON u.user_id = ja.user_id
      WHERE u.user_id = ?
      GROUP BY u.user_id;
    `;

    const [userRows] = await db.query(query, [userId]);

    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userRows[0];
    res.status(200).json({
      id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      phone: user.phone,
      bio: user.bio,
      // date_of_birth: user.date_of_birth,
      jobs_applied: user.jobs_applied,  // Adding the number of jobs applied
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
