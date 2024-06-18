// server.js
const http = require('http');
const geoip = require('geoip-lite');

const server = http.createServer((req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const geo = geoip.lookup(ip);

  if (geo) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      latitude: geo.ll[0],
      longitude: geo.ll[1],
      city: geo.city,
      region: geo.region,
      country: geo.country
    }));


  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Unable to determine geolocation');
  }
});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});