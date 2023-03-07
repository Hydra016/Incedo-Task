const express = require('express');
const artist = require('./routes/artistsRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use('/artist/', artist);


app.listen(port, () => console.log(`Server running on port ${port}`));
