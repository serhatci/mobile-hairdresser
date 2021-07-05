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

  socket.on('New Request', city => {
    console.log(`new request in ${city}`)
    socket.broadcast.emit('Hairdresser Request', city)
  })
})

module.exports = io
