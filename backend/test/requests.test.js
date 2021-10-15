/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-commented-out-tests */
const request = require('supertest')

const User = require('../src/models/user')
const Customer = require('../src/models/customer')
const Hairdresser = require('../src/models/hairdresser')
const Request = require('../src/models/request')

const app = require('../src/app')

jest.setTimeout(80000)

describe('Request endpoints', () => {
  let newCustomer
  let newHairdresser

  beforeAll(async () => {
    await Customer.register({ email: '_TestEmail_customer@trial.com' }, '123123')
    await Hairdresser.register({ email: '_TestEmail_hairdresser@trial.com' }, '123123')

    newCustomer = await Customer.findOne({ email: '_TestEmail_customer@trial.com' })
    newHairdresser = await Hairdresser.findOne({ email: '_TestEmail_hairdresser@trial.com' })

    for (let i = 0; i < 12; i += 1) {
      const requestToCreate = {
        senderId: newCustomer.id,
        senderFullName: 'Trial Name',
        requestType: 'Hairdresser Request',
        eventAddress: { city: 'Heilbronn', postcode: 74076, stateCode: 'BW' },
        message: `Trial message -- ${i} --`,
      }

      const newRequest = await Request.create(requestToCreate)

      const replyToCreate = {
        senderId: newHairdresser.id,
        senderFullName: 'Trial Name',
        senderType: 'Hairdresser',
        senderCity: 'Heilbronn',
        senderPostcode: 74076,
        message: `Trial Reply message -- ${i} --`,
      }

      await Request.findByIdAndUpdate(newRequest.id, { $push: { replies: replyToCreate } }, { new: true })
    }
  })

  afterAll(async () => {
    await User.deleteMany({ email: { $regex: /_TestEmail_/, $options: 'g' } })
    await Request.deleteMany({ senderId: newCustomer.id })
  })

  describe('GET request to api/requests', () => {
    it('should give requests up to max 10 request', async () => {
      const requestList = (await request(app).get('/api/requests')).body
      const lessThanTen = requestList.length <= 10
      const requestExist = requestList.length > 0

      expect(requestExist).toBe(true)
      expect(lessThanTen).toBe(true)
    })

    it('should filter requests by sender ID', async () => {
      const requestList = (await request(app).get(`/api/requests?senderId=${newCustomer.id}`)).body
      const requestExist = requestList.length > 0

      expect(requestExist).toBe(true)
      requestList.forEach(item => expect(item.senderId).toBe(newCustomer.id))
    })

    it('should filter requests by replier ID', async () => {
      const requestList = (await request(app).get(`/api/requests?replierId=${newHairdresser.id}`)).body
      const requestExist = requestList.length > 0

      expect(requestExist).toBe(true)
      requestList.forEach(item => expect(item.replies.length).toBe(1))
    })

    it('should filter requests by city', async () => {
      const requestList = (await request(app).get('/api/requests?city=Heilbronn')).body
      const requestExist = requestList.length > 0

      expect(requestExist).toBe(true)
      requestList.forEach(item => expect(item.eventAddress.city).toBe('Heilbronn'))
    })

    it('should filter requests by stateCode', async () => {
      const requestList = (await request(app).get('/api/requests?stateCode=BW')).body
      const requestExist = requestList.length > 0

      expect(requestExist).toBe(true)
      requestList.forEach(item => expect(item.eventAddress.stateCode).toBe('BW'))
    })

    it('should filter requests by postcode', async () => {
      const requestList = (await request(app).get('/api/requests?postcode=74076')).body
      const requestExist = requestList.length > 0

      expect(requestExist).toBe(true)
      requestList.forEach(item => expect(item.eventAddress.postcode).toBe(74076))
    })

    it('should filter requests by request type', async () => {
      const requestList = (await request(app).get('/api/requests?requestType=Hairdresser+Request')).body
      const requestExist = requestList.length > 0

      expect(requestExist).toBe(true)
      requestList.forEach(item => expect(item.requestType).toBe('Hairdresser Request'))
    })

    it('should return [] if no filtered requests are found', async () => {
      const userNotExist = (await request(app).get('/api/requests?postcode=00000000456456')).body

      expect(userNotExist).toEqual([])
    })

    it('api/requests/:requestId should return specific request', async () => {
      const requests = (await request(app).get('/api/requests')).body
      const testRequest = requests[0]
      const specificRequest = (await request(app).get(`/api/requests/${testRequest.id}`)).body

      expect(specificRequest.id).toEqual(testRequest.id)
    })

    it('api/requests/:requestId should return err if requestId is wrong', async () => {
      const error = (await request(app).get(`/api/requests/--wrongId--`)).body

      expect(error.message).toBe('Provided request ID has wrong format!')
    })
  })

  describe('POST request to api/requests', () => {
    it('should add a new request', async () => {
      const requestToCreate = {
        senderId: newCustomer.id,
        senderFullName: 'Trial Name',
        requestType: 'Hairdresser Request',
        eventAddress: { city: 'Heilbronn', postcode: 74076, stateCode: 'BW' },
        message: 'New Request',
      }

      const addedRequest = (await request(app).post('/api/requests').send(requestToCreate)).body

      expect(addedRequest.senderId).toEqual(newCustomer.id)
      expect(addedRequest.senderFullName).toEqual('Trial Name')
    })

    it('should not accept request with empty eventAddress', async () => {
      const emptyEmail = {
        senderId: newCustomer.id,
        senderFullName: 'Trial Name',
        requestType: 'Hairdresser Request',
        eventAddress: '',
        message: `Trial message -- new --`,
      }

      const addressError = (await request(app).post('/api/requests').send(emptyEmail)).body

      expect(addressError.message).toBe('Address must be selected from autocomplete list!')
    })

    it('should not accept request with empty message', async () => {
      const emptyMessage = {
        senderId: newCustomer.id,
        senderFullName: 'Trial Name',
        requestType: 'Hairdresser Request',
        eventAddress: { city: 'Heilbronn', postcode: 74076, stateCode: 'BW' },
        message: '',
      }

      const messageError = (await request(app).post('/api/requests').send(emptyMessage)).body

      expect(messageError.message).toBe('Message can not be empty!')
    })

    it('should not accept request with wrong request type', async () => {
      const emptyMessage = {
        senderId: newCustomer.id,
        senderFullName: 'Trial Name',
        requestType: '-- wrong type --',
        eventAddress: { city: 'Heilbronn', postcode: 74076, stateCode: 'BW' },
        message: 'Trial message -- new --',
      }

      const messageError = (await request(app).post('/api/requests').send(emptyMessage)).body

      expect(messageError.message).toBe('Request type is wrong')
    })
  })

  describe('DELETE request to api/requests/:requestId', () => {
    let addedRequest

    beforeAll(async () => {
      addedRequest = await Request.find({ message: 'New Request' })
    })

    it('should delete the given request', async () => {
      const deletedRequest = (await request(app).delete(`/api/requests/${addedRequest.id}`)).body

      expect(addedRequest.id).toEqual(deletedRequest.id)
    })

    it('should give error if given requestId is wrong', async () => {
      const wrongUserIdErr = (await request(app).delete(`/api/requests/ee213eee12322`)).body

      expect(wrongUserIdErr.message).toBe('Provided requestId has wrong format!')
    })
  })

  describe('POST request to api/:requestId/replies', () => {
    let addedRequest

    beforeAll(async () => {
      addedRequest = await Request.findOne({})
    })

    it('should add a new reply', async () => {
      const replyToCreate = {
        senderId: newHairdresser.id,
        senderFullName: 'Trial Name',
        senderType: 'Hairdresser',
        senderCity: 'Heilbronn',
        senderPostcode: 74076,
        message: 'Trial Reply message new',
      }

      const addedReply = (await request(app).post(`/api/requests/${addedRequest.id}/replies`).send(replyToCreate)).body

      expect(addedReply.message).toEqual('Trial Reply message new')
      expect(addedReply.senderFullName).toEqual('Trial Name')
    })

    it('should give error if message is empty', async () => {
      const replyToCreate = {
        senderId: newHairdresser.id,
        senderFullName: 'Trial Name',
        senderType: 'Hairdresser',
        senderCity: 'Heilbronn',
        senderPostcode: 74076,
        message: '',
      }

      const addedReply = (await request(app).post(`/api/requests/${addedRequest.id}/replies`).send(replyToCreate)).body

      expect(addedReply.message).toEqual('Message can not be empty!')
    })

    it('should give error if request is deleted', async () => {
      await Request.findByIdAndDelete(addedRequest.id)

      const replyToCreate = {
        senderId: newHairdresser.id,
        senderFullName: 'Trial Name',
        senderType: 'Hairdresser',
        senderCity: 'Heilbronn',
        senderPostcode: 74076,
        message: 'Trial Reply message new',
      }

      const addedReply = (await request(app).post(`/api/requests/${addedRequest.id}/replies`).send(replyToCreate)).body

      expect(addedReply.message).toEqual('This request is no more active! Probably deleted by user.')
    })
  })

  describe('DELETE request to api/:requestId/replies/:replyId', () => {
    let addedRequest

    beforeAll(async () => {
      addedRequest = await Request.findOne({})
    })

    it('should delete given reply', async () => {
      const deletedReply = (
        await request(app).post(`/api/requests/${addedRequest.id}/replies/${addedRequest.replies._id}`)
      ).body

      expect(deletedReply._id).toEqual(addedRequest.replies._id)
    })
  })
})
