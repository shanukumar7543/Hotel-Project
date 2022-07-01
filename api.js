// 1- import / require
const express = require('express');
const mysql = require('mysql')

const app = express();
const port = 3001;

app.use(express.json())

// Mysql connection create
const con =mysql.createConnection({
host:'localhost', //RDS = end point
user: 'root',
password: "",
database: 'tnplab'

})

// connectivity check
con.connect((err)=>{
if(err){
console.log(err.sqlMessage)
}else{
console.log("Database connected successfully")
}
})

// CRUD operation in database

// 1- GEt

app.get('/user',(req,res)=>{

const q1 = "select * from employee";

con.query(q1 , (err ,result)=>{
if(err){
res.send(err.sqlMessage)
}else{
res.json({"status":200 ,"Response": result })
}
})

})

// JSON = javascript Object notation
// POST method data insert=

app.post('/user',(req,res)=>{
const data = {
id: req.body.id,
name:req.body.name,
age:req.body.age,
salary: req.body.salary,
city :req.body.city
}
// Data push/send database
// console.log(data)
const q1 = "insert into employee values (?)"
con.query(q1, data, (err,result)=>{
if(err){
console.log(err.sqlMessage)
}else{
res.json({"status": 200 , "response":result})
}
})


})

// put(full data) / patch(partial data update)= update
// id = pramas
//
app.put('/user/:id',(req,res)=>{

// const id = req.params.id
// res.send(id)
const data = {
id: req.body.id,
name:req.body.name,
age:req.body.age,
salary: req.body.salary,
city :req.body.city
}
// res.json({aman:id, pandey:data})

// query define
const sqlQuery = "update employee SET ? where id = ?"
// indexing == [0] [1]
con.query(sqlQuery,[data, req.params.id],(err,result)=>{
if(err){
console.log(err.sqlMessage)
}else{
res.json({status:200, response:result})
}
})

})

// delete = data delete

app.delete('/user/:id',(req,res)=>{

const id = req.params.id
const q1 = "delete from employee where id = ?"
con.query(q1,id,(err,result)=>{
if(err){
res.send(err.sqlMessage)
}else{
res.json({status:200, response:result})
}
})

})

// default page
app.get('/',(req,res)=>{
res.send("Hello guest")
})

app.listen(port,(err)=>{
if(err){
console.log(err)
}else{
console.log(`Server started on http://localhost:${port}`)
}
})