const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors');
const app = express();
const artist = require('./routes/artistsRoute');
const users = require('./routes/userRoutes');

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())
app.use('/artist/', artist);
app.use('/users/', users);

mongoose.set('strictQuery', true);
mongoose.connect(`${process.env.DATABASE_CONNECTION}`, () => {
    console.log('connected')
})

app.listen(port, () => console.log(`Server running on port ${port}`));
