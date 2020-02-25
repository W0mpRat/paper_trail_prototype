const express = require('express')
const { User } = require('./db/models')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

User.findByPk(2).then((res) => {
  console.log(res)
  
  // // Save Example
  // res.age = res.age + 1
  // res.save({ userId: 2 }).then((res2) => {
  //   console.log(res2)
  // })
  // // End Save Example

  // // Update Example
  res.update({
    age: res.age + 1
  }, {
    userId: 2
  }).then((res2) => {
    console.log(res2)
  })
  // End Update Example
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

