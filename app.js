const express = require('express')
const { User } = require('./db/models')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

User.findByPk(1).then((res) => {
  console.log(res)
  res.age = res.age + 1

  res.save().then((res2) => {
    console.log(res2)
  })

  // res.update({
  //   age: res.age + 1
  // }, {
  //   // userId: 1
  // }).then((res2) => {
  //   console.log(res2)
  // })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

