const express = require("express")
const temperature = require('./sensor/temp');

const app = express()

app.get('/', () =>{
  res.send("hello, world")
})

app.get('/temp', () =>{
  res.send(temperature())
  console.log(temperature())
})

app.listen(3000, ()=>{
  console.log("Listening at http://localhost:3000/")
  console.log(temperature())
})