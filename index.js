class Hairdresser {
  constructor(name, surname, email, password) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.id = ''; //   generate ID or use from MongoDB IS?
    this.createdAt = new Date();
    this.address = '';
    this.tel = '';
    this.availability = ''; // combobox such as [weekdays, weekends, after 7 pm, etc... ]
    this.experience = ''; // combobox such as [less than 1 year, 1 year, 2 year, etc... ]
    this.videos = [];
    this.photos = [];
    this.serviceArea = ''; // perimeter in km around a location
    this.certificates = []; // image files
    this.employerReferences = [];
    this.customerReviews = [];
    this.ratings = 0;
  }
}
