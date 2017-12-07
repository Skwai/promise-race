import { expect } from 'chai'
import PromiseRace from '../'

describe('PromiseRace', () => {
  it('resolves to the first resolved promise', async () => {
    const queue = new PromiseRace()
  
    const p1 = new Promise(resolve => setTimeout(resolve(1), 1000))
    const p2 = new Promise(resolve => setTimeout(resolve(2), 500))
  
    queue.append(p1)
    queue.append(p2)

    const result = await queue.resolved()
    expect(result).to.equal(2)
  })
})
