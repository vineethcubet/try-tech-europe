const http = require('http')

const hostname = '127.0.0.1'
const port = 7673

const charger = {
  AddressInfo: {
    Title: '',
    Latitude: 1,
    Longitude: 2,
    AddressLine1: '',
    Town: '',
    StateOrProvince: '',
    Postcode: '',
  },
  Connections: []
}

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.end(JSON.stringify([charger]))
})

server.listen(port, hostname, () => {
  console.log(`Stub server running at: http://${hostname}:${port}/`)
})
