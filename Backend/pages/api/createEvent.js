import db from '../../lib/db';
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define allowed methods
  origin: '*', // Allow all origins, you can specify specific origins as well
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
});

// Helper function to run middleware
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
      // Run the CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, only POST is accepted' });
  }

  const { title, date, type, location, description } = req.body;

  if (!title || !date || !location || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Insert new event into MySQL database
    const result = await db.query(
      'INSERT INTO events (title, date, type, location, description) VALUES (?, ?, ?, ?, ?)', 
      [title, date, type, location, description]
    );

    return res.status(201).json({ message: 'Event created successfully', eventId: result.insertId });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating event', details: error });
  }
}
