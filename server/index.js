const express = require('express')
const connectToDb = require("./config/connectToDb")
const Note = require('./models/note')
const cors = require('cors');

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

require("dotenv").config();

const app = express()

const allowedOrigins = ['http://localhost:3000', 'https://website-rt.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin, like mobile apps or curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

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