class IdGenerator {
  // SINGLETON design pattern
  constructor() {
    IdGenerator.id = 1000
    if (IdGenerator.instance) {
      return IdGenerator.instance
    }
    IdGenerator.instance = this
  }

  generate () {
    IdGenerator.id += 1
    return IdGenerator.id
  }
}

class User {
  // Base class for Hairdresser and Customer
  constructor(name, surname, email, password) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.id = idGenerator.generate();
    this.createdAt = new Date();
    this.address = '';
    this.tel = '';
    this.photos = [];
    this.privateMessages = [];
  }

  uploadPhoto (photo) {
    this.photos.push(photo)
  }

  likePhoto (photo) {
    photo.likedBy.push(this)
  }

  tagPhoto (photo, user) {
    photo.taggedUsers.push(user)
  }

  likeVideo (video) {
    video.likedBy.push(this)
  }

  sendPM (user, message) {
    user.privateMessages.push(message)
  }
}

class Hairdresser extends User {
  constructor(name, surname, email, password) {
    super(name, surname, email, password)
    this.availability = ''; // [weekdays, weekends, after 7 pm, etc... ]
    this.experience = ''; // [less than 1 year, 1 year, 2 year, etc... ]
    this.serviceArea = 0; // perimeter in km around a location
    this.ratings = [];
    this.videos = [];
    this.certificates = [];
    this.employerReferences = [];
    this.customerReviews = [];
  }

  uploadVideo (video) {
    this.video.push(video)
  }

  tagVideo (video, user) {
    video.taggedUsers.push(user)
  }

  uploadCertificate (certificate) {
    this.certificates.push(certificate)
  }

  replyToCustomerRequest (request, reply) {
    request.replies.push(reply)
  }

  adviseToCustomerRequest (request, reply) {
    request.replies.push[reply]
  }
}

class Customer extends User {
  constructor(name, surname, email, password) {
    super(name, surname, email, password)
    this.customerRequests = []
  }

  uploadPhoto (photo, adviceRequest) {
    adviceRequest.photos.push(photo)
  }

  postRequest (request) {
    this.customerRequests.push(request)
  }

  rateHairdresser (hairdresser, rating) {
    hairdresser.ratings.push(rating)
  }

  reviewHairdresser (hairdresser, review) {
    hairdresser.customerReviews.push(review)
  }
}

class Photo {
  constructor(fileName) {
    this.id = idGenerator.generate()
    this.fileName = fileName
    this.taggedUsers = []
    this.likedBy = []
  }
}

class Video {
  constructor(fileName, title, description) {
    this.id = idGenerator.generate()
    this.fileName = fileName
    this.title = title
    this.description = description
    this.taggedUsers = []
    this.likedBy = []
  }
}

class Certificate {
  constructor(fileName, title) {
    this.id = idGenerator.generate()
    this.fileName = fileName
    this.title = title
  }
}

class Rating {
  constructor(user, rate) {
    this.user = user
    this.rate = rate
    this.date = new Date()
  }
}

class UserPost {
  constructor(user, postMessage) {
    this.user = user
    this.postMessage = postMessage
    this.id = idGenerator.generate()
    this.date = new Date()
  }
}

class CustomerRequest extends UserPost {
  constructor(user, type, postMessage) {
    super(user, postMessage)
    this.type = type
    this.replies = []
    this.photos = [] // optional
  }
}
