const express = require('express');   //step 1   import
const Mysql = require('mysql');


const app = express()
const port = 3001;

app.use(express.json())

// step 2 conncet database
const con = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tnplab'
})

//chake connection

con.connect((err) => {
    if (err) {
        console.log(err.sqlMessage)
    } else {
        console.log('database connected sucessfully')
    }

})

//1 get methrod  

app.get('/user', (req, res) => {
    const shanu = "select * from student";
    con.query(shanu, (err, result) => {
        if (err) {
            res.send(err.sqlMessage)
        } else {
            res.json({ "status": 200, "Response": result })
        }
    })
})

app.post('/user',(req, res)=>{
    const data = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        depart: req.body.depart
    }

    const query='insert into student set ?'
    con.query(query,data,(err,result)=>{
        if (err) {
            console.log(err.sqlMessage)
        } else {
            res.json({ "status": 201, "response": result })

        }
    })

})


app.put('/user/:id', (req, res) => {
    const data = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        depart: req.body.depart
    }



    const shanu = "update student set ? where id = ? "
    con.query(shanu, [data, req.params.id], (err, result) => {
        if (err) {
            console.log(err.sqlMessage)
        } else {
            res.json({ "status": 200, "response": result })

        }
    })

})




app.delete('/user/:id', (req, res) => {
    const id = req.params.id
    const shanu = "delete from student where id = ?"
    con.query(shanu, id, (err, result) => {
        if (err) {
            res.send(err.sqlMessage)
        } else {
            res.json({ status: 200, response: result })
        }
    })
})


app.get('/', (req, res) => {
    res.send("Hello guest")
})



app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server started on http://localhost:${port}`)
    }
})

