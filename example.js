//1  express - require 

const express = require("express")
const mysql = require("mysql")
const app = express();
// data type change  = string - json= > accept 
app.use(express.json())

// login mysql 
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:'',
  database:'school'
})

//  authentication = login true/flase 

con.connect((err)=>{
    if(err){
        console.log(err.sqlMessage)
    }else{
        console.log("MYSQL connected")
    }
})


//  get -  data view/ 

app.get('/get',(req,res)=>{
    //  databse data view. 

    const q1 = "Select * from student";
    con.query(q1,(err,result)=>{
        if(err){
            res.send(err.sqlMessage)
        }else{
            res.json({"response": result})}
        }
     )});

//  post-  data - send

app.post('/post',(req,res)=>{
    // 1- req - body 
    // const data = req.body
    // res.send(req.body)
    const data ={
        id : req.body.id,
        name:req.body.name,
        aad: req.body.aad
    }
const q1 = "insert into student SET ?"
    con.query(q1,data, (err,result)=>{
        if(err){
            res.send(err.sqlMessage)
        }else{
            res.send("Data Inserted")
        }
    
    })

})

//  data update = put(all data ) - patch selective data (selective data name,address, update, mobile,email )
app.put('/update/:id', (req,res)=>{

        console.log(req.params.id)
       const data ={
        name:req.body.name,
        aad: req.body.aad
    }
//  update tnplab set ?  where 
    const q1 = `UPDATE student SET ? WHERE id= ?`;
    con.query(q1,[data,req.params.id],(err,result)=>{
    
        if(err){
            res.send(err.sqlMessage)
        }else{
            res.json(result)
        }
    })
    //    res.json({id :id, data :data})
})

// delete = delete -  data remove

app.delete('/delete/:id',(req,res)=>{

    const quer= `delete from employee where id = ?`;
    con.query(quer, req.params.id,(err,result)=>{
        if(err){
            res.send(err.sqlMessage)
        }else{
            res.send(result)
        }
    })

})


app.listen(3000,()=>{
    console.log("Server started at http://localhost:3030")
} )
