import led from 'sense-hat-led';

const GREEN = [0, 255, 0]; // 绿色

// 绿色呼吸效果
function breatheGreen() {
    let brightness = 0; // 初始亮度
    let step = 5; // 亮度调整步长
    const maxBrightness = 255; // 最大亮度
    const minBrightness = 0; // 最小亮度

    const interval = setInterval(() => {
        const greenImage = [];
        for (let i = 0; i < 64; i++) {
            // 更新所有像素为当前亮度的绿色
            greenImage.push([0, brightness, 0]);
        }
        led.sync.setPixels(greenImage); // 设置 LED 显示当前图像
        brightness += step;

        if (brightness >= maxBrightness || brightness <= minBrightness) {
            step = -step; // 达到亮度极限时改变步长方向
        }
    }, 30); // 控制呼吸速度的定时器间隔
}

// 启动绿色呼吸效果
export default breatheGreen();