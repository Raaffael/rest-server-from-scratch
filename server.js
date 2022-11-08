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

app.get('/',function(req,res){
    getAll(req,res);
    //res.send('Hello world');
})

app.listen(PORT,function(){
    console.log(`Server is running on port : ${PORT}`)
})

async function getAll(req,res){
    try {
        const result = await client.query(`SELECT * FROM items;`)
        console.log(result.rows)
        res.send(result.rows);
    } catch (error) {
        console.error(error)
    }
}