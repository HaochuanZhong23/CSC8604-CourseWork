// sensorData.mjs

import SerialPort from 'serialport';

// SDS011传感器设置
const SDS011_PORT = '/dev/ttyUSB0';
const sds011SerialPort = new SerialPort(SDS011_PORT, { baudRate: 9600 });

sds011SerialPort.write(Buffer.from([0xAA, 0xB4, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAB]));

let pm25, pm10;

async function querySDS011Sensor() {
    sds011SerialPort.once('data', data => {
        const bytes = data;
        if (bytes[0] === 0xAA && bytes[1] === 0xC0) {
            //pm25 = (bytes[1] + bytes[2] * 256) / 10; // Calculate PM2.5 value
            pm25 = bytes[3] * 256 + bytes[2] / 10;
            //pm10 = (bytes[4] + bytes[5] * 256) / 10; // Calculate PM10 value
            pm10 = bytes[5]* 256 + bytes[4] / 10;
            console.log(`SDS011 - PM 2.5: ${pm25} μg/m3, PM 10: ${pm10} μg/m3`);
        } else {
            console.log('Invalid or incomplete data packet received');
        }
    });
}

sds011SerialPort.on('open', () => {
    console.log('SDS011 Serial Port Opened');
    setInterval(querySDS011Sensor, 3000); // 每秒查询SDS011传感器
})

export {pm10, pm25}