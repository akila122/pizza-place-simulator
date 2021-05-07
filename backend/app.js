const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const ordersRouter = require('./routes/orders')
const authRouter = require('./routes/auth').router
authRouter.refreshTokens = []

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/orders', ordersRouter)
app.use('/auth', authRouter)

module.exports = app
