const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
let data = require('./data');

app.use(bodyParser.urlencoded({ extended:false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());


app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.get('/test/:id',(req,res)=>{
    res.send('this is params');
})

app.post('/',(req,res) => {
    res.send({message:'your data is added',data:req.body})
})

app.put('/hello',(req,res) => {
    res.send('edit success');
})

app.delete('/hapus',(req,res)=>{
    res.send('deleted');
})
/////////////////////////////////////////////
////////////////////////////////////////////
///////////////////////////////////////////
app.get('/movie',(req,res)=>{
    res.json(data)
})

app.get('/movie/:id',(req,res)=>{
    const id = req.params.id;
    const item = data.find(_item => _item.id === id);
    if (item) {
        res.json(item);
     } else {
        res.json({ message: `item ${id} doesn't exist`})
     }
})

app.put('/movie/:id',(req,res)=>{
    const newData = []

    data.forEach(item => {
        if(item.id === req.params.id){
            newData.push(req.body)
        }else{
            newData.push(item)
        }
    })

    data = newData ;
    res.json(data);

})

app.delete('/movie/:id',(req,res)=>{

    const newData = data.filter(item => item.id !== req.params.id );
    data = newData;

    res.json(data);

})

app.delete('/movie',(req,res)=>{

    const newData = [];
    data = newData;

    res.json(data);

})

app.post('/movie',(req,res)=>{
    data.push(req.body);
    res.json(data);
})
////////////////////////////////////////
////////////////////////////////////////
//////////////////////////////////////// tr


app.listen(6700,()=>{
    console.log('check my port')
})
