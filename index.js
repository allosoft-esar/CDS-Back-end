const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const cors = require('cors')
require('dotenv').config()
require('./helpers/init_mongodb')

const cdsRoute = require('./routers/cdsRoute')
const sourceRoute = require('./routers/sourceRoute')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res, next) => {
  const data = 'Welcome To The Jungle'
  res.send({ data })
})

app.use('/CDS', cdsRoute)
app.use('/source', sourceRoute)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

const PORT = process.env.BACKEND_PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
