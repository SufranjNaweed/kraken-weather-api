require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 9000;

app.get('/', (req, res) => {
    res.status(200).send('Weather API is Running');
});

// Init Middleware
app.use(express.json({ extended : false }));

//Permission CORS 
// /!\ ALl resquest are open for dev purposes, in production mode please modify this /!\
app.use(cors());

// API's Routes 
app.use('/api/weathers', require('./services/weathers'));

// Always the last line of the entry point file
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });