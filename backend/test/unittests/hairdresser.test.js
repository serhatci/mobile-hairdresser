const Hairdresser = require('../../src/models/hairdresser')
const Customer = require('../../src/models/customer')
const Review = require('../../src/models/review')

jest.useFakeTimers()

const hairdresser = new Hairdresser({
  name: 'Hair',
  surname: 'Dresser',
  email: 'hair@dresser.com',
  password: 'password',
})
const customer = new Customer({
  name: 'custo',
  surname: 'mer',
  email: 'custo@mer.com',
  password: 'password',
})

describe('average rating method', () => {
  test('single rating of 5', () => {
    const review = new Review({ reviewer: customer, hairdresser, message: '', rating: 5 })
    customer.reviewHairdresser(hairdresser, review)
    const expectedResult = 5
    const actualOutput = hairdresser.averageRating
    expect(actualOutput).toBe(expectedResult)
  })
})
