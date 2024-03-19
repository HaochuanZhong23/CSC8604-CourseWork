import { temperature, humidity, setNewDataHandler, getCurrentValue } from '../sensor/tempHum.js';
import { pm25, pm10 } from '../sensor/pm.mjs';
import led from 'sense-hat-led';

const RED = [255, 0, 0];
const GREEN = [0, 255, 0];

let currentColor = GREEN; // 默认开始时使用绿色

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

    return () => clearInterval(interval); // 返回一个停止呼吸灯效果的函数
}

let stopBreathe = breatheLight(currentColor); // 启动默认呼吸灯效果

function checkAndUpdateLight() {
    const currentHumidity = getCurrentValue().humidity;
    const currentPm25 = pm25;
    const currentPm10 = pm10;

    const shouldBreatheRed = currentPm25 > 121 || currentPm10 > 351 || currentHumidity > 60 || currentHumidity < 20;
    const newColor = shouldBreatheRed ? RED : GREEN;

    if (currentColor !== newColor) {
        currentColor = newColor;
        stopBreathe(); // 停止当前的呼吸灯效果
        stopBreathe = breatheLight(currentColor); // 启动新的呼吸灯效果
    }
}

// 定期检查传感器读数，并更新灯光效果
setInterval(checkAndUpdateLight, 5000); // 每5秒检查一次
