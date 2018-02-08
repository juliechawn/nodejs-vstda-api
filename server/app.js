const express =  require('express');
const morgan =   require('morgan');
var bodyParser = require('body-parser');
const app =      express();

app.use(bodyParser.json({ type: 'application/json' }));

var jsonParser = bodyParser.json()

var data = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

/* ----- middleware ----*/

function lookupTask(number) {
  return data.filter(
    function(data){return data.todoItemId == number}
  );
}

function lookupTaskIndex(number) {
  return data.findIndex(
    function(data){return data.todoItemId == number}
  );
}

app.get('/', function (req, res) {
    res.json('status: ' + res.statusCode);
});


app.get('/api/TodoItems',function (req, res) {
    res.json(data);
    console.log(res.statusCode);
});

app.post('/api/TodoItems', function (req, res) {  
  var newObj = {
      todoItemId: req.body.todoItemId,
      name:       req.body.name,
      priority:   req.body.priority,
      completed:  req.body.completed
    } 

  data.push(newObj);
  console.log(data);
  res.status(201).json(newObj);
  console.log('Posted! ' + res.statusCode);
});

app.get('/api/TodoItems/:number', function (req, res) {
  var itemId = lookupTask(req.params['number']);
  res.json(itemId[0])
  console.log(res.statusCode);
});

app.delete('/api/TodoItems/:number', function (req,res) {
  var itemIndex = lookupTaskIndex(req.params['number']);
  var item = data.slice(itemIndex, 1);

  res.json(item[0]);
  console.log('Deleted! ' + res.statusCode)    
})


module.exports = app;
