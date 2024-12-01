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
    // Run CORS middleware
    await runMiddleware(req, res, cors);

        const query = `
            SELECT t.title, ts.views, ts.downloads
            FROM thesis_statistics ts
            JOIN theses t ON ts.thesis_id = t.thesis_id;
        `;

        try {
            // Fetch the data
            const [results] = await db.query('SELECT t.title, ts.views, ts.downloads FROM thesis_statistics ts JOIN theses t ON ts.thesis_id = t.thesis_id');

            // Return the results as JSON
            res.status(200).json(results);
        } catch (error) {
            console.error('Error fetching thesis data:', error);
            res.status(500).json({ error: 'Error fetching thesis data' });
        }
    
}
