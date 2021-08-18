const express = require('express')
const app = express.Router()


const adminRout = require('../Admin/adminControl')
const loguinControl = require('../Admin/loguinControl')

const productRout = require('../Control/productsControl')
const carrinhoControl = require('../Control/carrinhoControl')



app.use(adminRout)
app.use(productRout)
app.use(carrinhoControl)
app.use(loguinControl)

module.exports = app