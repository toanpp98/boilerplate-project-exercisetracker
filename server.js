const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Mongo DB connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.post('*', bodyParser.urlencoded({ extended: false }));

// Route
const route = require('./routes');
app.use(route);

// Not Found
app.use(() => {
  throw new Error('Not Found');
});

// Error Handler
app.use(({ message }, req, res, next) => {
  res.status(500).json({ error: message });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
