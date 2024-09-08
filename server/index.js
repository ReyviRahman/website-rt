const express = require('express')
const connectToDb = require("./config/connectToDb")
const cors = require('cors');
const notesController = require("./controllers/notesController")

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

app.get('/notes', notesController.fetchNotes)
app.get('/notes/:id', notesController.fetchNote)
app.post('/notes', notesController.createNote)
app.put('/notes/:id', notesController.updateNote)
app.delete('/notes/:id', notesController.deleteNote)

app.listen(process.env.PORT);