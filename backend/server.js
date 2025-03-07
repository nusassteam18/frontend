// server.js
const express = require('express')
const mysql = require('mysql2')  
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json()) // to parse JSON bodies

// Connection to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'nus_team18_db' 
})

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err)
    return
  }
  console.log('Connected to MySQL database.')
})


// post api to call when user register 
app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Validate required fields 
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  
  // Check if a user with this email already exists
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking email:', checkErr);
      return res.status(500).json({ message: 'Server error.' });
    }
    if (checkResults.length > 0) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // password hasing using bcrypt
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds)
      .then(hashedPassword => {
        const insertQuery = `
          INSERT INTO users (firstName, lastName, email, password, role)
          VALUES (?, ?, ?, ?, ?)
        `;
        db.query(
          insertQuery,
          [firstName, lastName, email, hashedPassword, role || 'Customer'],
          (insertErr, insertResults) => {
            if (insertErr) {
              console.error('Error inserting user:', insertErr);
              return res.status(500).json({ message: 'Server error.' });
            }
            return res.status(201).json({ message: 'User registered successfully.' });
          }
        );
      })
      .catch(error => {
        console.error('Error hashing password:', error);
        return res.status(500).json({ message: 'Server error.' });
      });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
