import express from 'express'
import cors from 'cors'
import { readSensorData } from './sensor/data.mjs'


const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/data', (req, res) => {
  const data = readSensorData()
  res.send(data)
  console.log(data)
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000/')
})