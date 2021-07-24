/* eslint-disable no-console */
const locationsData = require('./locations-data/locations.json')
const Location = require('./models/location')

module.exports = async function initializeDatabase(connection) {
  const collections = await connection.db.listCollections().toArray()
  const locations = collections.filter(collection => collection.name == 'locations')

  if (locations.length) return

  Location.insertMany(locationsData)
  console.log('\nCollection named "locations" is successfully created with geolocation data!..\n')
}
