export default class PromiseRace {
  constructor () {
    this.last = null
    this.lastID = null
  }

  isLastID (id) {
    return id === this.lastID
  }

  createID () {
    const id = Math.random().toString(36).substr(2, 10)
    this.lastID = id
    return id
  }

  append (promise) {
    if (!(promise instanceof Promise)) {
      throw Error('argument must be an instance of Promise')
    }
    const id = this.createID()
    const intercepted = new Promise((resolve, reject) => {
      promise
        .then((result) => {
          if (this.isLastID(id)) resolve(result)
        })
        .catch((err) => {
          if (this.isLastID(id)) reject(err)
        })
    })
    this.last = intercepted
    return intercepted
  }

  resolved () {
    return this.last || Promise.reject(Error('No promises have been received'))
  }
}
