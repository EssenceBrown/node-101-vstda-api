const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// add your code here
let mockData =[{
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


app.get('/',(req,res)=>{
    res.send({status: 'ok'});
});



app.get('/api/TodoItems', (req,res)=>{
    res.send(mockData);
});  

app.post('/api/TodoItems',(req,res)=>{
	for(let i=0; i<mockData.length; i++){
		if(mockData[i].todoItemId == req.body.todoItemId){
			mockData.splice(i,1,req.body)
			res.status(201).json(req.body);
			return 
		}
	}
	mockData.push(req.body);

})
	

app.delete('/api/TodoItems/:number',(req, res)=>{
		let deleteItem = req.params.number;
		let item;
		for(let i=0; i<mockData.length; i++){
		if(mockData[i].todoItemId == deleteItem){
			item = mockData[i];
			mockData.splice(i,1)
		}
	}
	res.status(200).send(item)
	})
	
	app.get('/api/TodoItems/:id',(req, res)=>{
		let item;
		for(let i=0; i<mockData.length; i++){
		if(mockData[i].todoItemId == req.params.id ){
			item = mockData[i];
		}
	}
	res.status(200).send(item)
	})
module.exports = app;
