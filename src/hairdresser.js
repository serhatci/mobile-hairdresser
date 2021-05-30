const User = require('./user')
const Reply = require('./reply')

class Hairdresser extends User {
  constructor(name, surname, email, password) {
    super(name, surname, email, password)
    this.availability = 'available' // [weekdays, weekends, after 7 pm, etc... ]
    this.experience = 'less than 1 year' // [less than 1 year, 1 year, 2 year, etc... ]
    this.serviceArea = undefined // perimeter in km around a location
    this.ratings = []
    this.portfolioVideos = []
    this.portfolioPhotos = []
    this.certificates = []
    this.employerReferences = []
    this.customerReviews = []
    this.repliedCustomerRequests = []
  }

  get portfolio() {
    return {
      fullname: this.fullName,
      email: this.email,
      serviceArea: this.serviceArea,
      availability: this.availability,
      experience: this.experience,
      videos: this.videos,
      photos: this.photos,
      customerReviews: this.customerReviews,
      ratings: this.ratings,
      certificates: this.certificates,
      employerReferences: this.employerReferences,
    }
  }

  uploadPhotoToPortfolio(photo) {
    this.photos.push(photo)
  }

  uploadVideoToPortfolio(video) {
    this.videos.push(video)
  }

  tagVideo(video, user) {
    video.taggedUsers.push(user)
  }

  uploadCertificate(certificate) {
    this.certificates.push(certificate)
  }

  writeReply(message, ...photos) {
    return new Reply(this, message, ...photos)
  }

  replyToCustomerRequest(request, reply) {
    request.replies.push(reply)
  }
}

module.exports = Hairdresser
