const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb://wshimei:Ga16012017@ds149049.mlab.com:49049/todos')
mongoose.Promise = global.Promise

const TodoSchema = require('./models/todo')

// app.set('view engine', 'ejs')

// app.get('/', function (req, res) {
//   res.send('Hello Todo List!')
// })
//
// app.listen(port, function () {
//   console.log('Express Test is running on ' + port)
// })
//
// app.get('/todos', function (req, res) {
//   TodoSchema.find({}, function (err, foundTodo) {
//     if (err) {
//       console.error(err)
//       return
//     }
//     res.render('./todos/index', {
//       allTodos: foundTodo
//     })
//   })
// })
//
// app.get('/todos/:_id', function (req, res) {
//   TodoSchema.findOne({id: req.params.id}, function (err, oneTodo) {
//     if (err) {
//       console.error(err)
//       return
//     }
//     res.render('./todos/show', {
//       todo: oneTodo
//     })
//   })
// })
