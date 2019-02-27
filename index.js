const express = require('express')

const db = require('./data/db.js')

const server = express()
const parser = express.json()
const PORT = '8888'

server.use(parser)

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.get('/now', (req, res) => {
  res.send(new Date().toString())
})

server.get('/api/hubs', (req, res) => {
  db.hubs
    .find()
    .then(hubs => {
      res.json(hubs)
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message })
    })
})

server.post('/api/hubs', (req, res) => {
  const newHub = req.body
  db.hubs
    .add(newHub)
    .then(dbHub => res.status(201).json(dbHub))
    .catch(({ code, message }) => {
      res.status(code).json({ err: message })
    })
})
server.delete('/api/hubs/:id', (req, res) => {
  const { id } = req.params
  db.hubs
    .remove(id)
    .then(hub => {
      hub ? res.json(hub) : res.status(400).json({ err: 'invalid request' })
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message })
    })
})
server.put('/api/hubs/:id', (req, res) => {
  const { id } = req.params
  const updatedHub = req.body
  db.hubs
    .update(id, updatedHub)
    .then(dbHub => {
      res.json(dbHub)
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message })
    })
})
server.get('/api/hubs/:id', (req, res) => {
  const { id } = req.params
  db.hubs
    .findById(id)
    .then(hub => {
      hub
        ? res.json(hub)
        : res.status(400).json({
            err: 'Is that a trick? Please provide a number for the id'
          })
    })
    .catch(({ code, message }) => {
      res.status(code).json({ err: message })
    })
})

server.listen(PORT, _ => {
  console.log(`listening on http://localhost:${PORT}`)
})
