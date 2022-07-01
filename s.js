const { json } = require("express")
const express = require("express")
const app1 = express()
const Mysql = require("mysql")


const con = Mysql.createConnection({
    host:"localhost",
    user:"root",
    password:" ",
    database:"university",
    port:"3306"

})

con.connect((err)=>{
       if(err){
        console.log(err.sqlMessage)
       }else{
        console.log("Connected Successfully")
       }
})

    app1.get("/get")


app1.listen(4500,(err)=>{
    if(err){
        console.log("err")
    }else{
        console.log("Server Started in http://localhost:4500")
    }
})
