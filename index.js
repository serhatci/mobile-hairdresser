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

    this.employerReferences = [];
    this.customerReviews = [];
    this.ratings = 0;
  }
}