/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-commented-out-tests */
const request = require('supertest')
const faker = require('faker')

const app = require('../src/app')

describe('Hairdressers endpoints', () => {
  describe('GET request to api/hairdressers', () => {
    beforeAll(async () => {
      await request(app).post('/api?create=testUsers')
    })

    afterAll(async () => {
      await request(app).delete('/api?delete=testUsers')
    })

    it('should give list of hairdressers', async () => {
      const hairdresserList = (await request(app).get('/api/hairdressers')).body
      const hairdressersExist = hairdresserList.length > 0
      expect(hairdressersExist).toBe(true)
    })

    it('should give max 10 hairdressers', async () => {
      const hairdresserList = (await request(app).get('/api/hairdressers')).body
      const lessThanTen = hairdresserList.length <= 10
      const hairdressersExist = hairdresserList.length > 0

      expect(hairdressersExist).toBe(true)
      expect(lessThanTen).toBe(true)
    })

    it('should filter hairdressers by city', async () => {
      const hairdresserList = (await request(app).get('/api/hairdressers?city=Heilbronn')).body
      const hairdressersExist = hairdresserList.length > 0

      expect(hairdressersExist).toBe(true)
      hairdresserList.forEach(user => expect(user.city).toEqual('Heilbronn'))
    })

    it('should filter hairdressers by state', async () => {
      const hairdresserList = (await request(app).get('/api/hairdressers?state=BW')).body
      const hairdressersExist = hairdresserList.length > 0

      expect(hairdressersExist).toBe(true)
      hairdresserList.forEach(user => expect(user.state).toEqual('BW'))
    })

    it('should filter hairdressers by postcode', async () => {
      const hairdresserList = (await request(app).get('/api/hairdressers?postcode=74076')).body
      const hairdressersExist = hairdresserList.length > 0

      expect(hairdressersExist).toBe(true)
      hairdresserList.forEach(user => expect(user.postcode).toEqual('74076'))
    })

    it('should return [] if no filtered users are found', async () => {
      const userNotExist = (await request(app).get('/api/hairdressers?postcode=00000000')).body
      expect(userNotExist).toEqual([])
    })

    it('api/hairdressers/:hairdresserId should return specific hairdresser', async () => {
      const hairdressers = (await request(app).get('/api/hairdressers')).body
      const hairdresser = hairdressers[0]

      const specificHairdresser = (await request(app).get(`/api/hairdressers/${hairdresser._id}`)).body
      expect(specificHairdresser._id).toEqual(hairdresser._id)
    })

    it('api/hairdressers/:hairdresserId should return err if hairdresserId is wrong', async () => {
      const error = (await request(app).get(`/api/hairdressers/--wrongId--`)).body
      expect(error.msg).toEqual('Provided HairdresserId has wrong format!')
    })
  })

  describe('POST request to api/hairdressers', () => {
    afterAll(async () => {
      await request(app).delete('/api?delete=testUsers')
    })

    const newHairdresser = {
      firstName: 'NewTestUser',
      lastName: 'OnlyCreatedForTestPurpose',
      email: 'unique@email.test',
      password: faker.internet.password(),
    }

    it('should add a new hairdresser', async () => {
      const addedHairdresser = (await request(app).post('/api/hairdressers').send(newHairdresser)).body
      expect(addedHairdresser.firstName).toEqual('NewTestUser')
      expect(addedHairdresser.email).toEqual('unique@email.test')
    })

    it('should only accept unique user emails', async () => {
      const addedHairdresser = (await request(app).post('/api/hairdressers').send(newHairdresser)).body
      expect(addedHairdresser.msg).toEqual('This user already exists!')
    })

    it('should not accept users with empty values', async () => {
      const emptyHairdresser = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }

      const error = (await request(app).post('/api/hairdressers').send(emptyHairdresser)).body
      expect(error.msg.firstName.name).toEqual('ValidatorError')
      expect(error.msg.lastName.name).toEqual('ValidatorError')
      expect(error.msg.email.name).toEqual('ValidatorError')
      expect(error.msg.password.name).toEqual('ValidatorError')
    })
  })

  describe('PUT request to api/hairdressers', () => {
    beforeAll(async () => {
      const newHairdresser = {
        firstName: 'NewTestUser',
        lastName: 'OnlyCreatedForTestPurpose',
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      await request(app).post('/api/hairdressers').send(newHairdresser)
    })

    afterAll(async () => {
      await request(app).delete('/api?delete=testUsers')
    })

    it('should update a given hairdresser', async () => {
      const hairdressers = (await request(app).get('/api/hairdressers')).body
      const hairdresser = hairdressers[0]

      hairdresser.city = 'Stuttgart'
      hairdresser.state = 'BW'
      hairdresser.postcode = '70000'
      hairdresser.tel = '10123123123123'

      const updatedHairdresser = (await request(app).put(`/api/hairdressers/${hairdresser._id}`).send(hairdresser)).body
      expect(updatedHairdresser.city).toEqual('Stuttgart')
      expect(updatedHairdresser.state).toEqual('BW')
      expect(updatedHairdresser.postcode).toEqual('70000')
      expect(updatedHairdresser.tel).toEqual('10123123123123')
    })

    it('should give validation error if provided data is wrong', async () => {
      const hairdressers = (await request(app).get('/api/hairdressers')).body
      const hairdresser = hairdressers[0]

      hairdresser.city = 'textWithSpecialChars:[]{}'
      hairdresser.tel = '123/123123'

      const error = (await request(app).put(`/api/hairdressers/${hairdresser._id}`).send(hairdresser)).body
      expect(error.msg.city.name).toEqual('ValidatorError')
      expect(error.msg.tel.name).toEqual('ValidatorError')
    })

    it('should give error if provided hairdresserId is wrong', async () => {
      const hairdressers = (await request(app).get('/api/hairdressers')).body
      const hairdresser = hairdressers[0]

      const error = (await request(app).put('/api/hairdressers/--wrongId--').send(hairdresser)).body
      expect(error.msg).toEqual('Provided HairdresserId has wrong format!')
    })

    it('should give error if provided hairdresserId does not exist in database', async () => {
      const error = (await request(app).put('/api/hairdressers/60cf817acbb01500be427bf8')).body
      expect(error.msg).toEqual('HairdresserId does not exist in database!')
    })
  })

  describe('DELETE request to api/hairdressers', () => {
    beforeAll(async () => {
      const newHairdresser = {
        firstName: 'NewTestUser',
        lastName: 'OnlyCreatedForTestPurpose',
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      await request(app).post('/api/hairdressers').send(newHairdresser)
    })

    afterAll(async () => {
      await request(app).delete('/api?delete=testUsers')
    })

    it('should delete a given hairdresser', async () => {
      const hairdressers = (await request(app).get('/api/hairdressers')).body
      const hairdresser = hairdressers[0]

      const deletedHairdresser = (await request(app).delete(`/api/hairdressers/${hairdresser._id}`)).body
      expect(deletedHairdresser._id).toEqual(hairdresser._id)
    })

    it('should give error if provided hairdresserId is wrong', async () => {
      const error = (await request(app).delete('/api/hairdressers/--wrongId--')).body
      expect(error.msg).toEqual('Provided HairdresserId has wrong format!')
    })

    it('should give error if provided hairdresserId does not exist in database', async () => {
      const error = (await request(app).delete('/api/hairdressers/60cf817acbb01500be427bf8')).body
      expect(error.msg).toEqual('HairdresserId does not exist in database!')
    })
  })
})
