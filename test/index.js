import { expect } from 'chai'
import PromiseRace from '../'

describe('PromiseRace', () => {
  describe('append()', () => {
    it('resolves when the last promise appended resolves', async () => {
      const race = new PromiseRace()

      const p1 = new Promise(resolve => setTimeout(resolve(1), 250))
      const p2 = new Promise(resolve => setTimeout(resolve(2), 500))

      let foo = 0

      race.append(p1).then(() => { foo = 1 })
      race.append(p2).then(() => { foo = 2 })

      await race.resolved()
      expect(foo).to.equal(2)
    })
  })

  describe('resolved()', () => {
    it('will resolve when the last promise appended resolves', async () => {
      const race = new PromiseRace()

      const p1 = new Promise(resolve => setTimeout(resolve(1), 250))
      const p2 = new Promise(resolve => setTimeout(resolve(2), 500))

      race.append(p1)
      race.append(p2)

      const result = await race.resolved()
      expect(result).to.equal(2)
    })
  })
})
