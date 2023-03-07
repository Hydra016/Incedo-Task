const request = require('request');
const json2csv = require('json2csv');
const fs = require('fs');

const getArtists = (req, res) => {
    const name = req.query.name;
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${process.env.API_KEY}&format=json`;

    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const result = JSON.parse(body).results.artistmatches.artist;
        const csv = json2csv.parse(result, { fields: ['name', 'mbid', 'url', 'image[0].#text', 'image[1].#text'] });
        const filename = req.query.filename || `${name}.csv`;
        res.set('Content-Disposition', `attachment; filename=${filename}`);
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csv);
        fs.writeFile(filename, csv, (err) => {
          if (err) throw err;
          console.log('CSV file saved.');
        });
      } else {
        res.status(500).send('Internal Server Error');
      }
    });
  }

  module.exports = {
    getArtists
  }