const dhtSensor = require('node-dht-sensor').promises;
const DHT_SENSOR_TYPE = 11;
const DHT_PIN = 4;

let temperature
let humidity

let newDataHandler = null

//Read DHT11 function
async function readDHT11Sensor() {
    try {
      const data = await dhtSensor.read(DHT_SENSOR_TYPE, DHT_PIN);
        temperature = data.temperature.toFixed(1);// getting temperature
        humidity = data.humidity.toFixed(1);//getting humidity
        console.log(`DHT11 - Temp: ${temperature}°C, Humidity: ${humidity}%`);
        if (newDataHandler) {
          newDataHandler(temperature, humidity)
        }
    } catch (err) {
      console.error('Error reading DHT11:', err.message);
    }
  }

function setNewDataHandler(handler) {
  newDataHandler = handler
}

//A call back function
function getCurrentValue() {
  return {
    temperature,
    humidity,
  }
}

setInterval(readDHT11Sensor, 3000); // check data every 3 seconds

module.exports = {temperature, humidity, setNewDataHandler, getCurrentValue}
