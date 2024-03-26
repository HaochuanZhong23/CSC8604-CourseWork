import { temperature, humidity, setNewDataHandler, getCurrentValue } from '../sensor/tempHum.js';
import { pm25, pm10 } from '../sensor/pm.mjs';
import led from 'sense-hat-led';

const RED = [255, 0, 0];
const GREEN = [0, 255, 0];

let currentColor = GREEN; // default to start with green

function breatheLight(color) {
    let step = 5;
    let minBrightness = 50;
    let maxBrightness = 255;
    let brightness = minBrightness;
    let increasing = true;

    const interval = setInterval(() => {
        led.sync.setPixels(Array(64).fill().map(() => color.map(c => Math.round(c * (brightness / maxBrightness)))));
        if (increasing) {
            brightness += step;
            if (brightness >= maxBrightness) increasing = false;
        } else {
            brightness -= step;
            if (brightness <= minBrightness) increasing = true;
        }
    }, 100);

    return () => clearInterval(interval);
}

let stopBreathe = breatheLight(currentColor); // call to change color

export function checkAndUpdateLight() {
    const currentHumidity = getCurrentValue().humidity;
    const currentPm25 = pm25;
    const currentPm10 = pm10;

    const shouldBreatheRed = currentPm25 > 121 || currentPm10 > 351 || currentHumidity > 60 || currentHumidity < 20;
    const newColor = shouldBreatheRed ? RED : GREEN;

    if (currentColor !== newColor) {
        currentColor = newColor;
        stopBreathe(); // stop breathing
        stopBreathe = breatheLight(currentColor); // change to another color
    }
}

// constant check sensor data
setInterval(checkAndUpdateLight, 5000); // every 5 sec
