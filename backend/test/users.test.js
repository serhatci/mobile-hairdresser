/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-commented-out-tests */
const request = require('supertest')
const faker = require('faker')

const app = require('../src/app')

jest.setTimeout(120000)

describe('Users endpoints', () => {
  describe('GET request to api/users', () => {
    beforeAll(async () => {
      await request(app).post('/api?testUsers=Yes')
    })

    afterAll(async () => {
      await request(app).delete('/api?testUsers=Yes')
    })

    it('should give list of users', async () => {
      const userList = (await request(app).get('/api/users')).body
      const usersExist = userList.length > 0
      expect(usersExist).toBe(true)
    })

    it('should give max 10 users', async () => {
      const userList = (await request(app).get('/api/users')).body
      const lessThanTen = userList.length <= 10
      const usersExist = userList.length > 0

      expect(usersExist).toBe(true)
      expect(lessThanTen).toBe(true)
    })

    it('should filter users by city', async () => {
      const userList = (await request(app).get('/api/users?city=Heilbronn')).body
      const usersExist = userList.length > 0

      expect(usersExist).toBe(true)
      userList.forEach(user => expect(user.city).toEqual('Heilbronn'))
    })

    it('should filter users by state', async () => {
      const userList = (await request(app).get('/api/users?state=BW')).body
      const usersExist = userList.length > 0

      expect(usersExist).toBe(true)
      userList.forEach(user => expect(user.state).toEqual('BW'))
    })

    it('should filter users by postcode', async () => {
      const userList = (await request(app).get('/api/users?postcode=74076')).body
      const usersExist = userList.length > 0

      expect(usersExist).toBe(true)
      userList.forEach(user => expect(user.postcode).toEqual('74076'))
    })

    it('should return [] if no filtered users are found', async () => {
      const userNotExist = (await request(app).get('/api/users?postcode=00000000')).body
      expect(userNotExist).toEqual([])
    })

    it('api/users/:userId should return specific user', async () => {
      const users = (await request(app).get('/api/users')).body
      const user = users[0]

      const specificUser = (await request(app).get(`/api/users/${user.id}`)).body
      expect(specificUser.id).toEqual(user.id)
    })

    it('api/users/:userId should return err if userId is wrong', async () => {
      const error = (await request(app).get(`/api/users/--wrongId--`)).body
      expect(error.message).toEqual('Provided UserId has wrong format!')
    })
  })

  describe('PUT request to api/users', () => {
    beforeAll(async () => {
      const newUser = {
        type: 'Hairdresser',
        email: `_TestEmail_${faker.internet.email()}`,
        password: '123',
        passwordConfirmation: '123',
      }

      await request(app).post('/api/account').send(newUser)
    })

    afterAll(async () => {
      await request(app).delete('/api?testUsers=Yes')
    })

    it('should update a given user', async () => {
      const users = (await request(app).get('/api/users')).body
      const user = users[0]

      user.city = 'Stuttgart'
      user.state = 'BW'
      user.postcode = '70000'
      user.tel = '10123123123123'

      const updatedUser = (await request(app).put(`/api/users/${user.id}`).send(user)).body
      expect(updatedUser.city).toEqual('Stuttgart')
      expect(updatedUser.state).toEqual('BW')
      expect(updatedUser.postcode).toEqual('70000')
      expect(updatedUser.tel).toEqual('10123123123123')
    })

    // it('should give validation error if provided data is wrong', async () => {
    //   const users = (await request(app).get('/api/users')).body
    //   const user = users[0]

    //   user.city = 'textWithSpecialChars:[]{}'
    //   user.tel = '123/123123'

    //   const error = (await request(app).put(`/api/users/${user.id}`).send(user)).body
    //   expect(error.message.city.name).toEqual('ValidatorError')
    //   expect(error.message.tel.name).toEqual('ValidatorError')
    // })

    it('should give error if provided userId is wrong', async () => {
      const users = (await request(app).get('/api/users')).body
      const user = users[0]

      const error = (await request(app).put('/api/users/--wrongId--').send(user)).body
      expect(error.message).toEqual('Provided UserId has wrong format!')
    })

    it('should give error if provided userId does not exist in database', async () => {
      const error = (await request(app).put('/api/users/60cf817acbb01500be427bf8')).body
      expect(error.message).toEqual('UserId does not exist in database!')
    })
  })

  describe('DELETE request to api/users', () => {
    beforeAll(async () => {
      const newUser = {
        type: 'Hairdresser',
        email: `_TestEmail_${faker.internet.email()}`,
        password: '123',
        passwordConfirmation: '123',
      }

      await request(app).post('/api/account').send(newUser)
    })

    afterAll(async () => {
      await request(app).delete('/api?testUsers=Yes')
    })

    it('should delete a given user', async () => {
      const users = (await request(app).get('/api/users')).body
      const user = users[0]

      const deletedUser = (await request(app).delete(`/api/users/${user.id}`)).body
      expect(deletedUser.id).toEqual(user.id)
    })

    it('should give error if provided userId is wrong', async () => {
      const error = (await request(app).delete('/api/users/--wrongId--')).body
      expect(error.message).toEqual('Provided UserId has wrong format!')
    })

    it('should give error if provided userId does not exist in database', async () => {
      const error = (await request(app).delete('/api/users/60cf817acbb01500be427bf8')).body
      expect(error.message).toEqual('UserId does not exist in database!')
    })
  })

  // describe('GET request to api/users/customers', () => {
  //   beforeAll(async () => {
  //     await request(app).post('/api?testUsers=Yes')
  //   })

  //   afterAll(async () => {
  //     await request(app).delete('/api?testUsers=Yes')
  //   })

  //   it('should give list of users', async () => {
  //     const userList = (await request(app).get('/api/users/customers')).body
  //     const usersExist = userList.length > 0
  //     expect(usersExist).toBe(true)
  //   })

  //   it('should give max 10 users', async () => {
  //     const userList = (await request(app).get('/api/users/customers')).body
  //     const lessThanTen = userList.length <= 10
  //     const usersExist = userList.length > 0

  //     expect(usersExist).toBe(true)
  //     expect(lessThanTen).toBe(true)
  //   })

  //   it('should filter users by city', async () => {
  //     const userList = (await request(app).get('/api/users/customers?city=Heilbronn')).body
  //     const usersExist = userList.length > 0

  //     expect(usersExist).toBe(true)
  //     userList.forEach(user => expect(user.city).toEqual('Heilbronn'))
  //   })

  //   it('should filter users by state', async () => {
  //     const userList = (await request(app).get('/api/users/customers?state=BW')).body
  //     const usersExist = userList.length > 0

  //     expect(usersExist).toBe(true)
  //     userList.forEach(user => expect(user.state).toEqual('BW'))
  //   })

  //   it('should filter users by postcode', async () => {
  //     const userList = (await request(app).get('/api/users/customers?postcode=74076')).body
  //     const usersExist = userList.length > 0

  //     expect(usersExist).toBe(true)
  //     userList.forEach(user => expect(user.postcode).toEqual('74076'))
  //   })

  //   it('should return [] if no filtered users are found', async () => {
  //     const userNotExist = (await request(app).get('/api/users/customers?postcode=00000000')).body
  //     expect(userNotExist).toEqual([])
  //   })

  //   it('api/users/customers/:userId should return specific user', async () => {
  //     const users = (await request(app).get('/api/users/customers')).body
  //     const user = users[0]

  //     const specificUser = (await request(app).get(`/api/users/customers/${user.id}`)).body
  //     expect(specificUser.id).toEqual(user.id)
  //   })

  //   it('api/users/customers/:userId should return err if userId is wrong', async () => {
  //     const error = (await request(app).get(`/api/users/customers/--wrongId--`)).body
  //     expect(error.message).toEqual('Provided UserId has wrong format!')
  //   })
  // })
})
