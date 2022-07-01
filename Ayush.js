const express = require('express');

const mysql = require('mysql');

const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "zomato"
})

con.connect((err)=> {
    if(err){
        console.log("Not Connected")
    }else{
        console.log("Connected succesfully")
    }
})

//   get
app.get('/hotellist', (req, res) => {
       const q1 = "select * from hotel";
        con.query(q1, (err, result)=>{
                    if(err){
                        res.send(err.sqlMessage)
                    }else{
                        res.json(result)
                    }
        })
});

// post

app.post('/hotelregistration', (req, res) => {

        const data = {
            h_id:req.body.h_id,
            h_name:req.body.h_name,
            address:req.body.address,
            city:req.body.city,
            state:req.body.state,
            pin:req.body.pin,
            owner:req.body.owner,
            contact:req.body.contact,
            type:req.body.type
            
        }

        const q1 = "insert into hotel SET ?";
        con.query(q1, data, (err, result) => {
            if(err){
                res.send(err.sqlMessage)
                console.log(err.sqlMessage)
            }else{
                res.send(result)
            }
        })
});




app.post('/menuitem', (req, res) => {

    const data = {
        m_id:req.body.m_id,
        item:req.body.item,
        price:req.body.price,
        tag:req.body.tag,
        avl_option:req.body.avl_option,
        h_id:req.body.h_id

    }

    const q1 = "insert into menu SET ?";
    con.query(q1, data, (err, result) => {
        if(err){
            res.send(err.sqlMessage)
            console.log(err.sqlMessage)
        }else{
            res.send(result)
        }
    })
});


app.get('/menulist', (req, res) => {

    const q1 = "select * from menu";
     con.query(q1, (err, result)=>{
                 if(err){
                     res.send(err.sqlMessage)
                 }else{
                     res.json(result)
                 }
     })
});

app.patch('/hotellist/:h_id', (req, res) => {
    const data = {
            
            h_name:req.body.h_name,
            address:req.body.address,
            city:req.body.city,
            state:req.body.state,
            pin:req.body.pin,
            owner:req.body.owner,
            contact:req.body.contact,
            type:req.body.type
    }

    const q1 = "update hotel SET ? where h_id = ?";
    con.query(q1, [data, req.params.h_id], (err, result) => {
        if(err){
            res.send(err.sqlMessage)
            // console.log(err.sqlMessage)
        }else{
            res.send(result)
        }
    })
});



app.delete('/hotellist/:h_id', (req, res) => {

    const del = req.params.h_id;
        const q1 = "delete from hotel where h_id = ?"
        con.query(q1, del, (err, result) => {
            if(err){
                res.send(err.sqlMessage)
                console.log(err.sqlMessage)
            }else{
                res.send(result)
            }
        })
});

app.delete('/menulist/:m_id', (req, res) => {

    const del = req.params.m_id;
    const q1 = "delete from menu where m_id = ?";
     con.query(q1, del, (err, result)=>{
                 if(err){
                     res.send(err.sqlMessage)
                 }else{
                     res.json(result)
                 }
     })
});


app.listen(4000, "127.0.0.1", (err) => {
    console.log("Connected") 
})