import db from '../../lib/db';
import bcrypt from 'bcrypt';
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

    if (req.method !== 'POST') {
        return res.status(405).json({ status: 'error', error: 'Method not allowed' });
    }

    const { email, phone, fullName, newPassword } = req.body;

    if (!email || !phone || !fullName || !newPassword) {
        return res.status(400).json({ status: 'error', error: 'All fields are required' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND phone = ? AND first_name = ?', [email, phone, fullName]);

        if (rows.length === 0) {
            return res.status(401).json({ status: 'error', error: 'Invalid details' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

        res.status(200).json({ status: 'success', message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
}