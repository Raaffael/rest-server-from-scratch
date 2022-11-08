const express = require('express');
const app = express();
const { Client } = require('pg');
app.use(express.json());
const PORT = 3000;

const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/items'
const client = new Client({
    connectionString: connectionString
})
client.connect();

app.get('/items',function(req,res,next){
    getAllItems(req,res,next);
})
app.get('/items/:itemID', function (req, res, next) {
    getOneItem(req, res, itemID, next);
})
app.post('/items', function(req,res,next){
    postItem(req,res,next);
})
app.patch('/items/:itemID',function(req,res,next){
    patchItem(req,res,next);
})
app.listen(PORT,function(){
    console.log(`Server is running on port : ${PORT}`)
})

async function getAllItems(req,res,next){
    try {
        const result = await client.query(`SELECT * FROM items;`)
        console.log(result.rows)
        res.send(result.rows);
    } catch (error) {
        next(error)
    }
}
async function getOneItem(req, res, next) {
    try {
        const petID = req.params.petID;
        const result = await client.query('SELECT * FROM item WHERE id = $1;',[petID]);
        console.log(result.rows.length);
        if (result.rows.length === 0) {
            return next({ status: 404, message: 'Not Found' })
        }
        res.send(result.rows);
    } catch (error) {
        next(error)
    }
}
async function postItem(req,res,next){
    try {
        const itemToAdd = req.body;
        const values = [itemToAdd.name,itemToAdd.price];
        const text = 'INSERT INTO pets (name,price) VALUES($1,$2,$3) RETURNING *';
        const result = await client.query(text,values);
        console.log(result.rows);
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}
async function patchItem(req,res,next){
    try {
        const itemToPatch = req.body;
        
    } catch (error) {
        next(error);
    }
}