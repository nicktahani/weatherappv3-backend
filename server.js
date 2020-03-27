const sqlite3 = require('sqlite3').verbose()
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

// open the database
const db = new sqlite3.Database('./cities.db')

async function sourceSearch (req, res) {
  const { searchString } = req.params
  console.log(`autocomplete: "${searchString}"`)
  const query = `SELECT city_name, state_code, country_code FROM cities WHERE city_name LIKE '%${searchString}%' LIMIT 10`

  db.all(query, [], (err, rows) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json({ searchString, rows })
  })
}

app.get('/api/search/:searchString', sourceSearch)
app.listen(3005, () => console.log('listening on port 3005'))





