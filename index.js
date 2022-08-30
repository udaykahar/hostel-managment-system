const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname + '/Homepage/')));
app.use(express.static(path.join(__dirname + '/SProfile/')));
app.use(express.static(path.join(__dirname + '/AdminProfile/')));
app.use(express.json());

const { Pool, Client } = require('pg')
const connectionString = 'postgresql://qgnywaxxlksyky:ba76171fc092a0f3ff06aee382bb09ff60737835a3cb0e84f466245ff8b89c84@ec2-54-159-175-38.compute-1.amazonaws.com:5432/d363ge7ljge2il'

const db = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
})

db.connect((err) => {
  if (err) throw err
  console.log("Connected")
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Homepage/index.html'))
})

auth = false

app.post('/stlogin', (req, res) => {
  db.query(`select * from student where username = '${req.body.entry1}' and password = '${req.body.password}';`, (err, result) => {
    if (result.rows.length == 0) {
      res.send({ 'login': 'failure' })
      auth = false
    }
    else {
      res.send({ 'login': 'successfull' })
      auth = true
    }
  })
})

app.get('/stin', (req, res) => {
  if (auth) {
    res.sendFile(path.join(__dirname, 'SProfile/login.html'))
    auth = false
  }
  else {
    res.redirect('/')
  }
})

app.post('/stext', (req, res) => {
  db.query(`select * from student where username = '${req.body.user}' and password = '${req.body.pass}'`, (err, result) => {
    if (err || result.rows.length == 0) {
      res.send({ 'extraction': 'failure' })
    }
    let qry = result.rows[0]
    res.send({
      'body': {
        'Student ID': `${qry.stid}`,
        'Name': `${qry.sname}`,
        'Phone Number': `${qry.sphone}`,
        'Hostel': `${qry.shostel}`,
        'Room Number': `${qry.sroom}`,
        'Username': `${qry.username}`
      }
    })
  })
})

app.get('/signout', function(req, res, next) {
  auth = null
  admin = null
  res.redirect('/');
});

app.post('/strstat', (req, res) => {
  db.query(`select reqid, reqstat from requests where stid = '${req.body.stid}';`, (err, result) => {
    if(err){throw(err)}
    else{
      if(result.rows.length == 0){
        res.send({'complaints': 'none'})
      }
      else if(result.rows.length == 1){
        res.send({'complaints': 'yes',
        'body' : result.rows[0]
        })
      }
    }
  })
})

admin = false

app.post('/admlogin', (req, res) => {
  db.query(`select * from admins where ausername = '${req.body.username}' and apassword = '${req.body.password}'`, (err, result) => {
    if (err || result.rows.length == 0) {
      res.send({ 'login': 'failure' })
      admin = false
    }
    else {
      res.send({ 'login': 'successful' })
      admin = true
    }
  })
})

app.get('/adin', (req, res) => {
  if (admin) {
    res.sendFile(path.join(__dirname, '/AdminProfile/login2.html'))
    admin = false
  }
  else {
    res.redirect('/')
  }
})

app.post('/alext', (req, res) => {
  db.query(`select * from admins where ausername = '${req.body.user}' and apassword = '${req.body.pass}'`, (err, result) => {
    if (err || result.rows.length == 0) {
      res.send({ 'extraction': 'failure' })
    }
    let qry = result.rows[0]
    res.send({ 'extraction': 'successful',
      'body': {
        'Admin ID': `${qry.admid}`,
        'Name': `${qry.aname}`,
        'Phone Number': `${qry.aphone}`, 
        'Username': `${qry.ausername}`
      }
    })
  })
})

app.post('/admext', (req,res) => {
  db.query(`select stid,sname,sphone,shostel,sroom,username from student;`, (err, result) => {
    res.send({'extract':'successful',
      'body': result.rows
    })
  })
})

let reqtype = (someint) => {
  switch(someint){
    case "1": return "CAHF"
    case "2": return "CAHS"
    case "3": return "CAAS"
    case "4": return "CACL"
  }
}

app.post('/newreq', (req, res) => {
  db.query(`select shostel from student where stid = '${req.body.stid}';`, (err, result) => {
    if(err) throw err
    db.query(`select reqid from requests`, (errr, reslt) => {
      if(errr) throw errr
      db.query(`insert into requests values('${req.body.stid}', '${req.body.desc}', '${result.rows[0].shostel}','req0${reslt.rows.length}', '${reqtype(req.body.ctype)}', '${req.body.ctime}')`, (eror, resolt) => {
        if(eror) throw eror
        res.send({'req': 'created'})
      })
    })
  })
})

app.post('/admcomp', (req,res) => {
  db.query(`select * from admins where ausername = '${req.body.entry3}' and apassword = '${req.body.password3}';`, (err, result) => {
    if(err) throw err
    if(result.rows.length == 0){
      res.send({'extract': 'failure'})
    }
    else{
      db.query(`select * from requests`, (er, resl) => {
        res.send({'extract': 'successful',
          'body': resl.rows
        })
      })
    }
  })
})

app.post('/chstat', (req, res) => {
  db.query(`update requests set reqstat = '${req.body.nstat}' where reqid = '${req.body.reqid}';`, (err, result) => {
    if(err){res.send({'change': 'np'}); throw err;}
    else{
      if(result.rowCount == 1){
        res.send({'change': 'applied'})
      }
      else{
        res.send({'change': 'np'})
      }
    }
  })
})

app.listen(5000, () => {
  console.log("Server Running on Port 5000")
})