const express = require('express')
const mongoose = require('mongoose')

const app = express()

const uri = 'DB link'

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log('====================================');
        console.log("Mongodb connected");
        console.log('====================================');
    } catch (error) {
        console.error(error)
    }
}

connect()

app.listen(8000, ()=>{
    console.log("Server Started in 8000 portal");
    
}   
)
