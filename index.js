/**
 * Class representing a PromiseRace
 */
export default class PromiseRace {
  /**
   * Create a PromiseRace
   */
  constructor () {
    Object.assign(this, {
      last: null,
      lastID: null
    })
  }

  /**
   * Returns true if the ID passed matches the ID of the last promise appended
   * @return {Boolean}
   */
  isLastID (id) {
    return id === this.lastID
  }

  /**
   * Create a unique identifier to identify each promise
   * @return {String}
   */
  createID () {
    const id = Math.random().toString(36).substr(2, 10)
    this.lastID = id
    return id
  }

  /**
   * Add a promise to the race
   * @param {Promise} promise
   * @return {Promise}
   */
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

  /**
   * Return a promise that resolves when the last promise called fires
   * @return {Promise}
   */
  resolved () {
    return this.last || Promise.reject(Error('No promises have been received'))
  }
}
