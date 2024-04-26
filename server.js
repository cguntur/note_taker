// Import express package
const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', api);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html')),
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Note taking app listening at http://localhost:${PORT}`)
);