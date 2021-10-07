/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-commented-out-tests */
const request = require('supertest')

const app = require('../src/app')

jest.setTimeout(120000)

describe('Locations endpoints', () => {
  describe('GET request to api/locations', () => {
    it('should return an array including all locations', async () => {
      const locations = (await request(app).get('/api/locations')).body
      expect(locations[0].postcode).toBe('78267')
      expect(locations[0].city).toBe('Aach')
      expect(locations[locations.length - 1].postcode).toBe('54579')
      expect(locations[locations.length - 1].city).toBe('Üxheim')
    })
  })
})
