/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-commented-out-tests */
const request = require('supertest')
const faker = require('faker')

const app = require('../src/app')

describe('Customers endpoints', () => {
  describe('GET request to api/customers', () => {
    beforeAll(async () => {
      await request(app).post('/api?create=testUsers')
    })

    afterAll(async () => {
      await request(app).delete('/api?delete=testUsers')
    })

    it('should give list of customers', async () => {
      const customerList = (await request(app).get('/api/customers')).body
      const customersExist = customerList.length > 0
      expect(customersExist).toBe(true)
    })

    it('should give max 10 customers', async () => {
      const customerList = (await request(app).get('/api/customers')).body
      const lessThanTen = customerList.length <= 10
      const customersExist = customerList.length > 0

      expect(customersExist).toBe(true)
      expect(lessThanTen).toBe(true)
    })

    it('should filter customers by city', async () => {
      const customerList = (await request(app).get('/api/customers?city=Heilbronn')).body
      const customersExist = customerList.length > 0

      expect(customersExist).toBe(true)
      customerList.forEach(user => expect(user.address.city).toEqual('Heilbronn'))
    })

    it('should filter customers by state', async () => {
      const customerList = (await request(app).get('/api/customers?state=BW')).body
      const customersExist = customerList.length > 0

      expect(customersExist).toBe(true)
      customerList.forEach(user => expect(user.address.state).toEqual('BW'))
    })

    it('should filter customers by postcode', async () => {
      const customerList = (await request(app).get('/api/customers?postcode=74076')).body
      const customersExist = customerList.length > 0

      expect(customersExist).toBe(true)
      customerList.forEach(user => expect(user.address.postcode).toEqual('74076'))
    })

    it('should return [] if no filtered users are found', async () => {
      const userNotExist = (await request(app).get('/api/customers?postcode=00000000')).body
      expect(userNotExist).toEqual([])
    })
  })

  describe('POST request to api/customers', () => {
    afterAll(async () => {
      await request(app).delete('/api?delete=testUsers')
    })

    const newCustomer = {
      firstName: 'NewTestUser',
      lastName: 'OnlyCreatedForTestPurpose',
      email: 'unique@email.test',
      password: faker.internet.password(),
    }

    it('should add a new customer', async () => {
      const addedCustomer = (await request(app).post('/api/customers').send(newCustomer)).body
      expect(addedCustomer.firstName).toEqual('NewTestUser')
      expect(addedCustomer.email).toEqual('unique@email.test')
    })

    it('should only accept unique user emails', async () => {
      const addedCustomer = (await request(app).post('/api/customers').send(newCustomer)).body
      expect(addedCustomer.msg).toEqual('This user already exists!')
    })

    it('should not accept users with empty values', async () => {
      const emptyCustomer = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }

      const error = (await request(app).post('/api/customers').send(emptyCustomer)).body
      expect(error.msg.firstName.name).toEqual('ValidatorError')
      expect(error.msg.lastName.name).toEqual('ValidatorError')
      expect(error.msg.email.name).toEqual('ValidatorError')
      expect(error.msg.password.name).toEqual('ValidatorError')
    })
  })
})
