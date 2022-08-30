const { Pool, Client } = require('pg')
const connectionString = 'postgresql://qgnywaxxlksyky:ba76171fc092a0f3ff06aee382bb09ff60737835a3cb0e84f466245ff8b89c84@ec2-54-159-175-38.compute-1.amazonaws.com:5432/d363ge7ljge2il'

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }

})

client.connect((err) => {
  if (err) throw err
  console.log("Connected")
})

// client.query('SELECT * FROM student', (err, res) => {
//   console.log('Students:', res.rows.length, '\n')
//   console.log(res.rows)
//   // console.log(res.rows.length)
// })

// client.query('SELECT * FROM admins', (err, res) => {
//   console.log('Admins:', res.rows.length, '\n')
//   console.log(res.rows)
//   // console.log(res.rows.length)
// })

client.query(`update requests set reqstat = 'Approved' where reqid = 'req00';`, (err, res) => {
  console.log(res.rowCount)
})