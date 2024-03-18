//Light
import SerialPort from 'serialport';

const portPath = '/dev/ttyACM0';
const baudRate = 115200;
const Readline = SerialPort.parsers.Readline;

const port = new SerialPort(portPath, {
  baudRate: baudRate
});
const parser2 = port.pipe(new Readline({ delimiter: '\r\n' }));

let value = 0; // Initialize value variable outside the event listener

parser2.on('data', function(data) {
  console.log(data);
  let parsedValue = parseInt(data.split('Light:')[1], 10); // Parse the value
  if (!isNaN(parsedValue)) { // Check if parsed value is a number
    value = parsedValue;
  }
});

// Exporting a function to get the value
export function getLightValue() {
  return value;
}