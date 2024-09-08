const express = require('express')
const connectToDb = require("./config/connectToDb")
const Note = require('./models/note')
const cors = require('cors');

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

require("dotenv").config();

const app = express()

app.use(cors({
  origin: 'https://website-rt.vercel.app'
}))

app.use(express.json())

connectToDb()

app.get('/', (req, res) => {
  res.json({hello: "world"})
})

app.get('/notes', async (req, res) => {
  const notes = await Note.find()
  res.json({notes: notes})
})

app.post('/notes', async (req, res) => {
  const title = req.body.title
  const body = req.body.body

  const note = await Note.create({
    title: title,
    body: body
  })

  res.json({note: note})
})

app.listen(process.env.PORT);