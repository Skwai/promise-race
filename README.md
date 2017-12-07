# PromiseRace

An ES6 class to help with Promise races. This is useful when you want to ignore redundant promises that are overriden by a promise called afterwards

## Install
```
$ npm install -S promise-race
```

## Usage
```js
import PromiseRace from 'promise-race'

const race = new PromiseRace()

const p1 = new Promise(resolve => setTimeout(resolve(1), 250))
const p2 = new Promise(resolve => setTimeout(resolve(2), 500))

let foo

// `p1` promise WON'T resolve as `p2` was appended later
race.append(p1).then(() => { foo = 1 })

// this promise WILL resolve as it was appended after `p1`
race.append(p2).then(() => { foo = 2 })

console.log(foo) // 2

// This will return a promise that resolves with the last appended promise
promise.resolved()
  .then(() => {
    // ...
  })
```
