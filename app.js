const express = require('express')
const { User } = require('./db/models')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.put('/update_user_age/:id', (req, response) => {
  User.findByPk(req.params.id).then((res) => {   
    // // Save Example
    // res.age = res.age + 1
    // res.save({ userId: 2 }).then((res2) => {
    //   console.log(res2)
    // })
    // // End Save Example
  
    // Update Example
    res.update({
      age: res.age + 1
    }, {
      userId: 2
    }).then((res2) => {
      response.status(200).send(res2)
    })

    // End Update Example
  })
})

app.put('/update_user_name/:id', (req, response) => {
  User.findByPk(req.params.id).then((res) => {
    res.update({
      firstName: res.firstName + 'z',
    }, {
      userId: 2,
      fields: ['firstName', 'revision']
    }).then((res2) => {
      response.status(200).send(res2)
    })
  })
})

app.get('/update_user_both/:id', (req, response) => {
  User.findByPk(req.params.id).then((res) => {
    res.update({
      firstName: res.firstName + 'z',
      age: res.age + 1
    }, {
      userId: 2
    }).then((res2) => {
      response.status(200).send(res2)
    })
  })
})

app.get('/users/:id', (req, response) => {
  User.findByPk(req.params.id, {
    include: [{
      model: User.sequelize.models['Revision'],
      include: [{
        model: User.sequelize.models['RevisionChange']
      }]
    }]
  }).then((res) => {
    for (const revision of res.Revisions) {
      revision.dataValues.document = JSON.parse(revision.dataValues.document)
      for (const change of revision.RevisionChanges) {
        change.dataValues.document = JSON.parse(change.dataValues.document)
        change.dataValues.diff = JSON.parse(change.dataValues.diff)
      }
    }
    response.status(200).send(res)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
