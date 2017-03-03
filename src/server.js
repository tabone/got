'use strict'

const path = require('path')
const express = require('express')
const config = require('../config')
const utils = require('./utils')

const port = process.env.PORT || config.port

const app = express()

app.get('/api/house/:username', (req, res) => {
  const username = req.params.username

  if (typeof username !== 'string') res.send('a man has no house...')

  utils.getHouse(username)
    .then(house => res.json({ house }))
    .catch(err => {
      console.error(err)
      res.status(500).send({
        error: {
          message: 'Joffrey is yet again messing with the files...'
        }
      })
    })
})

app.use(express.static(path.join(__dirname, '../public')))

app.listen(port, () => {
  console.info(`Opening the gates on port ${port}`)
})
