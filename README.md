# promise-race

An ES6 class to help with Promise races. This is useful when you want to ignore previous promises that are overriden by a more recently called promise

## Install
```
$ npm install -S promise-race
```

## Usage
```js
import PromiseRace from 'promise-race'

const race = new PromiseRace()
const search = (query) => {
  return race.append(fetch(`https://example.com/?q=${query}`, { mode: 'no-cors' }))
    .then((response) => console.log(`${query} response from example.com`, response))
}
search('dogs', 100)
search('cats', 200)
// only the 'cats' search will resolve as it was appended _after_ the 'dogs' search

// `resolved` will return the last promise
race.resolved().then(() => {
  // a new race
  search('ferret', 100)
  search('gerbil', 200)
  // only the 'gerbil' search will resolve as it was appended _after_ the 'ferret' search
})
```
