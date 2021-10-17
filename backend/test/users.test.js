/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-commented-out-tests */
const request = require('supertest')
const faker = require('faker')

const mongoose = require('mongoose')

const Customer = require('../src/models/customer')
const Hairdresser = require('../src/models/hairdresser')
const User = require('../src/models/user')

const app = require('../src/app')

jest.setTimeout(80000)

describe('Users endpoints', () => {
  beforeAll(async () => {
    for (let i = 0; i < 25; i += 1) {
      const email = `_TestEmail_${faker.internet.email()}`
      const password = faker.internet.password()

      if (i % 2) {
        await Customer.register({ email }, password)
      } else {
        await Hairdresser.register({ email }, password)
      }
    }

    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const city = 'Heilbronn'
    const stateCode = 'BW'
    const postcode = 74076

    await User.updateMany(
      { email: { $regex: /_TestEmail_/, $options: 'g' } },
      {
        firstName,
        lastName,
        'address.city': city,
        'address.stateCode': stateCode,
        'address.postcode': postcode,
        locations: [],
      }
    )
  })

  afterAll(async () => {
    await User.deleteMany({ email: { $regex: /_TestEmail_/, $options: 'g' } })
    mongoose.disconnect()
  })

  describe('GET request to api/users', () => {
    it('should give list of users', async () => {
      const userList = (await request(app).get('/api/users')).body
      const usersExist = userList.length > 0

      expect(usersExist).toBe(true)
    })

    it('should not provide hash, salt and versions data of users', async () => {
      const userList = (await request(app).get('/api/users')).body
      const singleUser = userList[0]

      expect(singleUser.hash).toBe(undefined)
      expect(singleUser.salt).toBe(undefined)
      expect(singleUser.__v).toBe(undefined)
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
      userList.forEach(user => expect(user.address.city).toBe('Heilbronn'))
    })

    it('should filter users by stateCode', async () => {
      const userList = (await request(app).get('/api/users?stateCode=BW')).body
      const usersExist = userList.length > 0

      expect(usersExist).toBe(true)
      userList.forEach(user => expect(user.address.stateCode).toBe('BW'))
    })

    it('should filter users by postcode', async () => {
      const userList = (await request(app).get('/api/users?postcode=74076')).body
      const usersExist = userList.length > 0

      expect(usersExist).toBe(true)
      userList.forEach(user => expect(user.address.postcode).toBe(74076))
    })

    it('should filter users by type', async () => {
      const userList = (await request(app).get('/api/users?userType=Hairdresser')).body
      const usersExist = userList.length > 0

      expect(usersExist).toBe(true)
      userList.forEach(user => expect(user.type).toBe('Hairdresser'))
    })

    it('should return [] if no filtered users are found', async () => {
      const userNotExist = (await request(app).get('/api/users?postcode=00000000456456')).body
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
      expect(error.message).toBe('Provided UserId has wrong format!')
    })
  })

  describe('PATCH request to api/users', () => {
    let user

    beforeAll(async () => {
      const users = (await request(app).get('/api/users')).body
      // eslint-disable-next-line prefer-destructuring
      user = users[0]
    })

    it('should update a given user', async () => {
      const input = {
        firstName: 'trial',
        lastName: 'trial',
        userAddress: { city: 'Stuttgart', postcode: 70374 },
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}`).send(input)).body

      expect(updatedUser.address.city).toBe('Stuttgart')
      expect(updatedUser.address.stateCode).toBe('BW')
      expect(updatedUser.address.postcode).toBe(70374)
    })

    it('should give error if first name is empty', async () => {
      const input = {
        firstName: '',
        lastName: 'trial',
        userAddress: { city: 'Stuttgart', postcode: 70374 },
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}`).send(input)).body

      expect(updatedUser.message).toBe('First name can not be empty!')
    })

    it('should give error if last name is empty', async () => {
      const input = {
        firstName: 'trial',
        lastName: '',
        userAddress: { city: 'Stuttgart', postcode: 70374 },
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}`).send(input)).body

      expect(updatedUser.message).toBe('Last name can not be empty!')
    })

    it('should give error if address is empty', async () => {
      const input = {
        firstName: 'trial',
        lastName: 'trial',
        userAddress: '',
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}`).send(input)).body

      expect(updatedUser.message).toBe('Address can not be empty!')
    })

    it('should give validation error if provided data is wrong', async () => {
      const input = {
        firstName: 'trial-=#$%',
        lastName: 'trial#$%@^%$',
        userAddress: { city: 'Stuttgart', postcode: 70374 },
      }

      const error = await request(app).patch(`/api/users/${user.id}`).send(input)
      expect(error.status).toBe(422)
    })

    it('should give error if provided userId is wrong', async () => {
      const input = {
        firstName: 'trial',
        lastName: 'trial',
        userAddress: { city: 'Stuttgart', postcode: 70374 },
      }

      const error = (await request(app).patch('/api/users/--wrongId--').send(input)).body
      expect(error.message).toBe('Provided UserId has wrong format!')
    })

    it('should give error if provided userId does not exist in database', async () => {
      const input = {
        firstName: 'trial',
        lastName: 'trial',
        userAddress: { city: 'Stuttgart', postcode: 70374 },
      }

      const error = (await request(app).patch('/api/users/6160e67c986074001d44a5c9').send(input)).body
      expect(error.message).toBe('UserId does not exist in database!')
    })
  })

  describe('PATCH request to api/users/:userId/portfolio/:key', () => {
    let user

    beforeAll(async () => {
      const users = (await request(app).get('/api/users?userType=Hairdresser')).body
      // eslint-disable-next-line prefer-destructuring
      user = users[0]
    })

    it('should update portfolio about', async () => {
      const input = {
        value: 'trial',
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}/portfolio/about`).send(input)).body
      expect(updatedUser.about).toBe('trial')
    })

    it('should update portfolio website', async () => {
      const input = {
        value: 'www.trial.com',
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}/portfolio/website`).send(input)).body
      expect(updatedUser.website).toBe('www.trial.com')
    })

    it('should update portfolio facebook', async () => {
      const input = {
        value: 'www.facebook.com/123123',
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}/portfolio/facebook`).send(input)).body
      expect(updatedUser.facebook).toBe('www.facebook.com/123123')
    })

    it('should update portfolio instagram', async () => {
      const input = {
        value: 'www.instagram.com/123123',
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}/portfolio/instagram`).send(input)).body
      expect(updatedUser.instagram).toBe('www.instagram.com/123123')
    })

    it('should update portfolio availability', async () => {
      const input = {
        value: 'only weekends',
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}/portfolio/availability`).send(input)).body
      expect(updatedUser.availability).toBe('only weekends')
    })

    it('should update portfolio experience in years', async () => {
      const input = {
        value: 5,
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}/portfolio/experienceInYears`).send(input))
        .body
      expect(updatedUser.experienceInYears).toBe(5)
    })

    it('should update portfolio service area', async () => {
      const input = {
        value: 50,
      }

      const updatedUser = (await request(app).patch(`/api/users/${user.id}/portfolio/serviceArea`).send(input)).body
      expect(updatedUser.serviceArea).toBe(50)
    })

    it('should only accept integer numbers', async () => {
      const input = {
        value: 5.5,
      }

      const error = (await request(app).patch(`/api/users/${user.id}/portfolio/experienceInYears`).send(input)).body
      expect(error.message).toBe('Only integer numbers are allowed!')

      const error2 = (await request(app).patch(`/api/users/${user.id}/portfolio/serviceArea`).send(input)).body
      expect(error2.message).toBe('Only integer numbers are allowed!')
    })

    it('should give error if provided userId is wrong', async () => {
      const input = {
        value: 'trial',
      }

      const error = (await request(app).patch('/api/users/--wrongId--/portfolio/about').send(input)).body
      expect(error.message).toBe('Provided UserId has wrong format!')
    })

    it('should give error if provided userId does not exist in database', async () => {
      const input = {
        value: 'trial',
      }

      const error = (await request(app).patch('/api/users/6160e67c986074001d44a5c9/portfolio/about').send(input)).body
      expect(error.message).toBe('UserId does not exist in database!')
    })
  })
})
