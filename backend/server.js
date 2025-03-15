// server.js
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()
const PORT = 3000
const SECRET_KEY = 'YOUR_SECRET_KEY'  // Use an environment variable in production

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

/* =======================
   REGISTER ENDPOINT
   ======================= */
app.post('/api/register', (req, res) => {
  const { firstName, lastName, email, password, role } = req.body

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields.' })
  }

  const checkQuery = 'SELECT * FROM users WHERE email = ?'
  db.query(checkQuery, [email], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking email:', checkErr)
      return res.status(500).json({ message: 'Server error.' })
    }
    if (checkResults.length > 0) {
      return res.status(400).json({ message: 'Email is already in use.' })
    }

    const saltRounds = 10
    bcrypt.hash(password, saltRounds)
      .then(hashedPassword => {
        const insertQuery = `
          INSERT INTO users (firstName, lastName, email, password, role)
          VALUES (?, ?, ?, ?, ?)
        `
        db.query(
          insertQuery,
          [firstName, lastName, email, hashedPassword, role || 'Customer'],
          (insertErr, insertResults) => {
            if (insertErr) {
              console.error('Error inserting user:', insertErr)
              return res.status(500).json({ message: 'Server error.' })
            }
            return res.status(201).json({ message: 'User registered successfully.' })
          }
        )
      })
      .catch(error => {
        console.error('Error hashing password:', error)
        return res.status(500).json({ message: 'Server error.' })
      })
  })
})

/* =======================
   LOGIN ENDPOINT
   ======================= */
app.post('/api/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password.' })
  }

  const checkQuery = 'SELECT * FROM users WHERE email = ?'
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err)
      return res.status(500).json({ message: 'Server error.' })
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials.' })
    }

    const user = results[0]

    bcrypt.compare(password, user.password, (compareErr, isMatch) => {
      if (compareErr) {
        console.error('Error comparing passwords:', compareErr)
        return res.status(500).json({ message: 'Server error.' })
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' })
      }

      // Use user.id as the identifier
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
      )

      res.json({
        message: 'Login successful.',
        token: token,
        user: {
          userId: user.id,  // note: using user.id (PK is 'id')
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      })
    })
  })
})

/* =======================
   GET USER PROFILE ENDPOINTS
   ======================= */

// 1) GET base user info (excluding password)
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id
  const sql = 'SELECT id, firstName, lastName, email, role FROM users WHERE id = ?'

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err)
      return res.status(500).json({ message: 'Server error.' })
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found.' })
    }
    res.json(results[0])
  })
})

// 2) GET customer-specific info by userId
app.get('/api/customers/:id', (req, res) => {
  const userId = req.params.id
  const sql = `
    SELECT contactNo, creditCardNo, creditCardName, 
           creditCardExpiryDate, creditCardSecurityCode, homeAddress
    FROM customers
    WHERE userId = ?
  `
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching customer info:', err)
      return res.status(500).json({ message: 'Server error.' })
    }
    // Return empty object if no record found
    if (results.length === 0) {
      return res.json({})
    }
    res.json(results[0])
  })
})

// 3) GET admin-specific info by userId
app.get('/api/admins/:id', (req, res) => {
  const userId = req.params.id
  const sql = 'SELECT restaurantId FROM admins WHERE userId = ?'
  
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching admin info:', err)
      return res.status(500).json({ message: 'Server error.' })
    }
    if (results.length === 0) {
      return res.json({})
    }
    res.json(results[0])
  })
})

/* =======================
   START THE SERVER
   ======================= */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
