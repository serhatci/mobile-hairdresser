const io = require('socket.io')({
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

io.on('connect', socket => {
  socket.on('Connection Check', () => {
    console.log(`web socket connected!..`)
  })

  socket.on('New Request', address => {
    console.log(`new request in ${address.city}`)
    socket.broadcast.emit('Hairdresser Request', address)
  })
})

module.exports = io
