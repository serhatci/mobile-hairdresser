const User = require('./user')
const Reply = require('./reply')

class Hairdresser extends User {
  constructor(name, surname, email, password) {
    super(name, surname, email, password)
    this.availability = 'available' // [weekdays, weekends, after 7 pm, etc... ]
    this.experience = 'less than 1 year' // [less than 1 year, 1 year, 2 year, etc... ]
    this.serviceArea = undefined // perimeter in km around a location
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
      portfolioVideos: this.portfolioVideos,
      portfolioPhotos: this.portfolioPhotos,
      customerReviews: this.customerReviews,
      ratings: this.ratings,
      certificates: this.certificates,
      employerReferences: this.employerReferences,
    }
  }

  uploadPhotoToPortfolio(photo) {
    this.portfolioPhotos.push(photo)
  }

  uploadVideoToPortfolio(video) {
    this.portfolioVideos.push(video)
  }

  deletePhotoFromPortfolio(photo) {
    this.portfolioPhotos = this.portfolioPhotos.filter(p => p !== photo)
  }

  deleteVideoFromPortfolio(video) {
    this.portfolioVideos = this.portfolioVideos.filter(p => p !== video)
  }

  addEmployerReference(employerName, shopName, employerAddress, employerEmail, employerTelephone) {
    this.employerReferences.push({
      name: employerName,
      shop: shopName,
      address: employerAddress,
      email: employerEmail,
      telephone: employerTelephone,
    })
  }

  deleteEmployerReference(reference) {
    const referenceIndex = this.employerReferences.indexOf(reference)
    this.employerReferences.splice(referenceIndex, 1)
  }
  tagVideo(video, user) {
    video.taggedUsers.push(user)
  }

  unTagVideo(video, user) {
    const userIndex = video.taggedUsers.indexOf(user)
    video.taggedUsers.splice(userIndex, 1)
  }

  uploadCertificate(certificate) {
    this.certificates.push(certificate)
  }

  replyToCustomerRequest(request, message, ...photos) {
    const reply = new Reply(this, message, ...photos)
    request.replies.push(reply)
    this.repliedCustomerRequests.push(request)
  }
}

module.exports = Hairdresser
