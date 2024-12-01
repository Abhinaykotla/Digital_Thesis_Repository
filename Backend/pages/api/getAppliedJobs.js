import jwt from 'jsonwebtoken';
import db from '../../lib/db'; // Adjust the path to your DB connection file
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
    return res.status(405).json({ error: 'Method not allowed' }); // Only allow GET requests
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract JWT from the Authorization header
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is missing' });
    }

    // Verify the token
    const secretKey = process.env.JWT_SECRET; // Make sure you set this in your environment variables
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
      console.log(decoded);
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Extract user_id from the decoded token
    const { id } = decoded;
    if (!id) {
      return res.status(400).json({ error: 'User ID is missing in the token' });
    }

    // Query the database for applied jobs
    const query = `
      SELECT ja.job_id, j.job_title, j.company_name, j.location, ja.created_at
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.job_id
      WHERE ja.user_id = ?;
    `;
    const [rows] = await db.query(query, [id]); // Execute the query

    // Respond with the applied jobs
    res.status(200).json({
      success: true,
      appliedJobs: rows,
    });
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ error: 'Failed to fetch applied jobs' });
  }
}
