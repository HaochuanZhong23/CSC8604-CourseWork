const SerialPort = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const dhtSensor = require('node-dht-sensor').promises;
const fs = require('fs');

// SDS011传感器设置
const SDS011_PORT = '/dev/ttyUSB0';
const sds011SerialPort = new SerialPort(SDS011_PORT, { baudRate: 9600 });

const parser = sds011SerialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// DHT11传感器设置
const DHT_SENSOR_TYPE = 11; // 对应DHT11
const DHT_PIN = 4; // 树莓派上连接DHT11数据线的GPIO针脚

// 读取SDS011传感器
function querySDS011Sensor() {
  const command = Buffer.from([0xAA, 0xB4, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAB]);
  sds011SerialPort.write(command, function(err) {
    if (err) {
      console.error('Error on write to SDS011:', err.message);
    } else {
      console.log('SDS011 query sent');
    }
  });
}
// Send request to the sensor
sds011SerialPort.write(Buffer.from([0xAA, 0xB4, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAB]));

// Read a fixed number of bytes (10 bytes) from the serial port
async function querySDS011Sensor(){
sds011SerialPort.once('data', data => {
  const bytes = data;
  if (bytes[0] === 0xAA && bytes[1] === 0xC0) {
    const pm25 = (bytes[3] + bytes[2] * 256) / 10; // Calculate PM2.5 value
    const pm10 = (bytes[5] + bytes[4] * 256) / 10; // Calculate PM10 value
    console.log(`SDS011 - PM 2.5: ${pm25} μg/m3, PM 10: ${pm10} μg/m3`);
  } else {
    console.log('Invalid or incomplete data packet received');
  }
});
}

// 读取DHT11传感器
async function readDHT11Sensor() {
  try {
    const { temperature, humidity } = await dhtSensor.read(DHT_SENSOR_TYPE, DHT_PIN);
    console.log(`DHT11 - Temp: ${temperature.toFixed(1)}°C, Humidity: ${humidity.toFixed(1)}%`);
  } catch (err) {
    console.error('Error reading DHT11:', err.message);
  }
}

sds011SerialPort.on('open', () => {
  console.log('SDS011 Serial Port Opened');
  setInterval(querySDS011Sensor, 3000); // 每秒查询SDS011传感器
});

setInterval(readDHT11Sensor, 3000); // 每两秒读取一次DHT11传感器数据

function logData(pm25, pm10, temperature, humidity) {
  const data = { pm25, pm10, temperature, humidity, timestamp: new Date() };
  fs.writeFileSync('sensor_data.json', JSON.stringify(data));
}

const fs = require('fs');
// Function to read the sensor data from the file
export default function readSensorData() {
  try {
    // Synchronously read the file content
    const data = fs.readFileSync('sensor_data.json', 'utf8');
    // Parse the JSON content to an object
    const sensorData = JSON.parse(data);
    return sensorData;
  } catch (err) {
    console.error('Error reading the sensor data file:', err);
    return null;
  }
}
// Example usage
const sensorData = readSensorData();
if (sensorData) {
  console.log(`PM 2.5: ${sensorData.pm25} μg/m3`);
  console.log(`PM 10: ${sensorData.pm10} μg/m3`);
  console.log(`Temperature: ${sensorData.temperature}°C`);
  console.log(`Humidity: ${sensorData.humidity}%`);
  console.log(`Timestamp: ${sensorData.timestamp}`);
}