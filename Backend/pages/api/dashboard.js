import db from '../../lib/db';
import bcrypt from 'bcrypt'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating tokens
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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed, only GET is accepted' });
  }

  try {
    // Query total users
    const [usersCount] = await db.query('SELECT COUNT(*) AS total FROM users');
    
    // Query total jobs posted
    const [jobsCount] = await db.query('SELECT COUNT(*) AS total FROM jobs');

    // Query total events listed
    const [eventsCount] = await db.query('SELECT COUNT(*) AS total FROM events');

    // Query recent activities (fetch the last 5 activities)
    const [recentActivities] = await db.query(
      'SELECT activity, created_at FROM activities ORDER BY created_at DESC LIMIT 5'
    );

    // Query upcoming events (fetch the next 5 upcoming events)
    const [upcomingEvents] = await db.query(
      'SELECT title, date, location FROM events WHERE date >= NOW() ORDER BY date LIMIT 5'
    );

    // Prepare the response data
    const dashboardData = {
      totalUsers: usersCount[0].total,
      jobsPosted: jobsCount[0].total,
      eventsListed: eventsCount[0].total,
      recentActivities: recentActivities,
      upcomingEvents: upcomingEvents
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({ error: 'Error fetching dashboard data', details: error });
  }
}
