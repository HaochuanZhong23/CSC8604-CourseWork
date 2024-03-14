import express from 'express'
import cors from 'cors'
import temperature from './sensor/temp.mjs'
import humidity from './sensor/humidity.mjs'
import light from './sensor/light.mjs'
import pm25 from './sensor/pm2.5.mjs'
import pm10 from './sensor/pm10.mjs'


const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/temp', (req, res) => {
  const tempData = temperature()
  res.send(JSON.stringify(tempData))
  console.log(tempData)
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000/')
})