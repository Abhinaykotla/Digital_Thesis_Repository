import db from '../../lib/db';
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
  // Run the CORS middleware before any other code
  await runMiddleware(req, res, cors);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed, only GET is accepted' });
  }

  try {
    // Query all jobs from the database
    const [rows] = await db.query('SELECT * FROM jobs ORDER BY posted_date DESC');

    // Return the list of jobs
    res.status(200).json({ jobs: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch jobs, internal server error' });
  }
}
