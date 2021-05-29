const User = require('./user')
const Reply = require('./reply')

class Hairdresser extends User {
  constructor(name, surname, email, password) {
    super(name, surname, email, password)
    this.availability = 'available' // [weekdays, weekends, after 7 pm, etc... ]
    this.experience = 'less than 1 year' // [less than 1 year, 1 year, 2 year, etc... ]
    this.serviceArea = undefined // perimeter in km around a location
    this.ratings = []
    this.videos = []
    this.photos = []
    this.certificates = []
    this.employerReferences = []
    this.customerReviews = []
  }

  get portfolio() {
    return `
        Name: ${this.fullName}
        Address: ${this.address}
        Telephone: ${this.tel}

        ${this.name} ${this.surname} currently has/have ${this.photos.length} photo(s)
        ${this.name} ${this.surname} currently has/have ${this.videos.length} video(s)
        ${this.name} ${this.surname} currently has/have ${this.customerReviews.length} Customer Review(s)`
  }

  uploadVideo(video) {
    this.video.push(video)
  }

  tagVideo(video, user) {
    video.taggedUsers.push(user)
  }

  uploadCertificate(certificate) {
    this.certificates.push(certificate)
  }

  writeReply(message, photos = []) {
    return new Reply(this, message, photos)
  }

  replyToCustomerRequest(request, reply) {
    request.replies.push(reply)
  }
}

module.exports = Hairdresser
