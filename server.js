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
    res.send('Hello world');
})

app.listen(PORT,function(){
    console.log(`Server is running on port : ${PORT}`)
})