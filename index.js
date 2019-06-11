const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const query = 'SELECT * FROM client';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'temp',
    database: 'user1'
});

connection.connect(err => {
    if (err){
        console.log(err);//Shows complete log to the console.
        return err;
    }
});

//console.log(connection);

app.use(cors());

app.get('/',(req,res) => {
    res.send("Go to /user to see users.");
});

app.get('/user',(req,res) => {
    connection.query(query,(err,results)=>{
        if (err)
            return res.send(err);
        return res.json({
            data: results
        });
    });
});

app.listen(4000,()=>{
    console.log("Listening to port 4000");
});