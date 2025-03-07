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


// 1) Require jsonwebtoken at the top
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'YOUR_SECRET_KEY'; // Replace with an env variable in production

// 2) Add the login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password.' });
  }

  // 3) Check if user exists
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error.' });
    }

    // If no user found
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const user = results[0];

    // 4) Compare password using bcrypt
    const bcrypt = require('bcrypt');
    bcrypt.compare(password, user.password, (compareErr, isMatch) => {
      if (compareErr) {
        console.error('Error comparing passwords:', compareErr);
        return res.status(500).json({ message: 'Server error.' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // 5) Password is correct => generate a JWT token
      // Embed userId and role in the token payload
      const token = jwt.sign(
        { userId: user.userId, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' } // token expires in 1 hour
      );

      // 6) Return token to client
      res.json({
        message: 'Login successful.',
        token: token,
        // Optionally return user details if you need them on the frontend
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      });
    });
  });
});

