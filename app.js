const express = require ('express');
const mysql = require ('mysql');

//Mysql Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database: 'nodemysql'
});

// Connect
db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('MYSQL Connected');
})
const app = express();

//Create DB
app.get('/createdb', (req,res) =>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err,result) =>{
        if (err) throw err;
        console.log(result);
        res.send('DB Created');
    });
});

//Create Table
app.get('/createtable', (req,res) =>{
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(30), cellphone VARCHAR(10), PRIMARY KEY(id))';
    db.query(sql, (err,result) =>{
        if (err) throw err;
        console.log(result);
        res.send('Table Created');
    });
});

//Create
app.get("/createUser", (req,res) =>{
    let post ={name:'John Legend', cellphone:'3192336738'};
    let sql = 'INSERT INTO users SET ?';
    let query =db.query(sql,post, (err, result) =>{
        if (err) throw err;
        console.log(result);
        res.send('User Created');
    });
});

app.get("/getUsers", (req,res) =>{
    let sql = 'select * from users';
    let query =db.query(sql, (err, result) =>{
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get("/getUser/:id", (req,res) =>{
    let sql = `select * from users where id= ${req.params.id}`;
    let query =db.query(sql, (err, result) =>{
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.listen("5000", () =>{
    console.log("Server running on port 5000");
});
