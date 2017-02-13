const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const mongoose = require('mongoose')
mongoose.connect('mongodb://wshimei:Ga16012017@ds149049.mlab.com:49049/todos')
mongoose.Promise = global.Promise

const todosControl = require('./controllers/todos_controller.js')

const TodoSchema = require('./models/todo')

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.send('Hello Todo List!')
})

app.listen(port, function () {
  console.log('Express Test is running on ' + port)
})

app.get('/todos', function (req, res) {
  TodoSchema.find({}, function (err, foundTodo) {
    if (err) {
      console.error(err)
      return
    }
    res.render('./todos/index', {
      allTodos: foundTodo
    })
  })
})

app.get('/todos/:_id', function (req, res) {
  TodoSchema.findOne({id: req.params.id}, function (err, oneTodo) {
    if (err) {
      console.error(err)
      return
    }
    res.render('./todos/show', {
      todo: oneTodo
    })
  })
})

const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)
const prefix = '> '


// This helper function simply console logs all of the supported commands
function displayHelp () {
  console.log('Please input one of the following commands')
  console.log(' "create [one-word-name] [one-word-description] [completed]" will create a new todo')
  console.log(' "list" will list all todos')
  console.log(' "show [id]" will show the TODO with the given id')
  console.log(' "update [id] [name] [description] [completed]" will update the TODO with the given id')
  console.log(' "destroy [id]" will delete the TODO with the given id')
  console.log(' "destroyAll" will delete all todos')
  console.log(' "quit" will exit the application')
  console.log(' "help" will list the supported commands')
}
// this function turns a boolean value into a more human friendly message
function successMessage (success) {
  return success ? 'succeeded' : 'failed'
}

// using readline, we can create a loop that reads every new line the user enters
rl.on('line', (line) => {
  // a very basic REPL, we simply split the user input into a series of words and use those to dictate our actions
  let words = line.trim().split(' ')
  let success = false
  switch (words[0]) {
    case 'create':
      // we use the 2nd, 3rd & 4th words the user input as the name, description and completed status of our new todo
      todosControl.create({name: words[1], description: words[2], completed: words[3]})
      break
    case 'list':
      todosControl.list()
      break
    case 'show':
      todosControl.show(words[1])
      break
    case 'update':
      todosControl.update(words[1], {name: words[2], description: words[3], completed: words[4]})
      break
    case 'destroy':
      todosControl.destroy(words[1])
      break
    case 'destroyAll':
      todosControl.destroyAll()
      break
    case 'quit':
      rl.close()
      return
    case 'help':
      displayHelp()
      break
    default:
      console.log('That is not a valid option')
      displayHelp()
      break
  }
  rl.setPrompt(prefix, prefix.length)
  rl.prompt()
}).on('close', function () {
  process.exit(0)
})

console.log('TODO LIST APP')
displayHelp()
rl.setPrompt(prefix, prefix.length)
rl.prompt()
