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

  const { topic, author, year, keywords, thesis_id, searchTerm } = req.query;

  try {
    let query = 'SELECT * FROM theses WHERE 1=1';
    const queryParams = [];

    if (thesis_id) {
      query += ' AND thesis_id = ?';
      queryParams.push(thesis_id);
    }

    if (topic) {
      query += ' AND topic LIKE ?';
      queryParams.push(`%${topic}%`);
    }
    if (author) {
      if(author!=1)
      {
      query += ' AND author_id LIKE ?';
      queryParams.push(`%${author}%`);
    }
    }
    if (year) {
      query += ' AND year = ?';
      queryParams.push(year);
    }
    if (keywords) {
      query += ' AND keywords LIKE ?';
      queryParams.push(`%${keywords}%`);
    }

    if (searchTerm) {
      query += ' AND (author LIKE ? OR topic LIKE ? OR title LIKE ? OR keywords LIKE ?)';
      const searchWildcard = `%${searchTerm}%`;
      queryParams.push(searchWildcard, searchWildcard, searchWildcard, searchWildcard);
    }
    

    const [rows] = await db.query(query, queryParams);

    res.status(200).json({ theses: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch theses, internal server error' });
  }
}
