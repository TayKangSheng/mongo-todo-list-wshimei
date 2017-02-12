// TODO. import TODO Model ;-)
const Todo = require('../models/todo')

function create (params) {
  // create a new TODO and console log the response
  Todo.create((params), function (err, todo) {
    if (err) {
      console.error(err)
      return
    }
    console.log(todo)
  })
}

function list () {
  // console log the list of all TODOs
  Todo.find({}, function (err, foundTodo) {
    if (err) {
      console.error(err)
      return
    }
    console.log(foundTodo)
  })
}

function show (id) {
  // find the TODO with this id and console log it
  Todo.findById(id, function (err, foundId) {
    if (err) {
      console.error(err)
      return
    }
    console.log(foundId)
  })
}

function update (id, params) {
  // find the TODO with this id and update it's params. console log the result.
  Todo.update(id, params, {new: true}, function (err, update) {
    if (err) {
      console.error(err)
      return
    }
    Todo.find(id, function(err, updatedTodo) {
      if(err) {
        console.error(err)
        return
      }
      console.log(updatedTodo)
    })
  })
}

function destroy (id) {
  // find the TODO with this id and destroy it. console log success/failure.
  Todo.findOneAndRemove(id, function (err, found) {
    if (err) {
      console.error(err)
      return
    }
    console.log(found)
  })
}

function destroyAll () {
  Todo.remove({}, function (err, destoryAllTodos) {
    if (err) {
      console.error(err)
      return
    }
    console.log('Destoyed All')
  })
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
