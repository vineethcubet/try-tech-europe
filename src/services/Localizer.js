import axios from 'axios'

const boundaries = [
  {
    region: 'NA',
    west: 172.446508,
    east: -66.986187
  },
  {
    region: 'EU',
    west: -10.566757,
    east: 40.201563
  },
  {
    region: 'CN',
    west: 73.505058,
    east: 134.726968
  }
]

const resolveLocale = (coordinates) => {
  const match = boundaries.find((boundary) => {
    return coordinates.lng <= boundary.east && coordinates.lng >= boundary.west
  })

  return match ? match.region : 'NA'
}

export default {
  async getLocale () {
    const response = await axios.get('https://ipapi.co/json')

    return resolveLocale({
      lat: response.data.latitude,
      lng: response.data.longitude
    })
  }
}
