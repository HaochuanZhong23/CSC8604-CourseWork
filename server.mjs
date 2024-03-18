import express from 'express'
import cors from 'cors'
import {pm25, pm10} from './sensor/pm.mjs'
import { temperature, humidity, setNewDataHandler, getCurrentValue } from './sensor/tempHum.js'


const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/pm25', (req, res) => {
    res.json({pm25})
    console.log(pm25)
})

app.get('/pm10', (req, res) => {
    res.json({pm10})
    console.log(pm10)
})

app.get('/temp', (req, res) => {
  //res.json({temperature})
  res.json({
    temperature: getCurrentValue().temperature
  })
  console.log(temperature)
})

app.get('/hum', (req, res) => {
  //res.json({humidity})
  res.json({
    humidity: getCurrentValue().humidity
  })
  console.log(humidity)
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000/')
  console.log(pm25)
  console.log(pm10)
})
