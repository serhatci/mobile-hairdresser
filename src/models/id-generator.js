class IdGenerator {
  // SINGLETON design pattern
  constructor() {
    IdGenerator.id = 1000
    if (IdGenerator.instance) {
      return IdGenerator.instance
    }
    IdGenerator.instance = this
  }

  generate() {
    IdGenerator.id += 1
    return IdGenerator.id
  }
}

module.exports = IdGenerator
