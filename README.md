# LeafLink Web App Source Code Documentation

## Files in Use

### Back-end

- **pm.mjs**: Retrieves pm10 and pm2.5 data
    - Import: `import { pm10, pm25 }` to get pm data

- **tempHum.mjs**: Retrieves temperature and humidity
    - Import: `import { temperature, humidity, getCurrentValue }` to get temperature and humidity
    - `getCurrentValue()` is a callback function

- **light.mjs**: Retrieves brightness from Microbit
    - Import: `import { getLightValue }` to get brightness
    - `getLightValue()` is a callback function

- **AllLight.mjs**: Controls breathing light (Raspberry Pi LED)
    - Import: `import { checkAndUpdateLight }` and call it to control breathing light

- **server.mjs**: Transmits different data via URLs
    - URL format: `http://localhost:3000/` + `{url}`
    - URLs:
        - `/pm25`
        - `/pm10`
        - `/light`
        - `/hum`
        - `/temp`

### Front-end

- **humidity.jsx/light.jsx/pm10.jsx/pm25.jsx/temp.jsx**: Flow chart components (called in `insight.jsx`)
- **App.jsx**: Router management
- **Result.jsx**: Landing page, air quality summary, gateway
- **Insight.jsx**: Real-time flow charts
- **Suggestion.jsx**: Plant suggestion according to measured air quality

## Setup

Before running:
- Install dependencies:
    - `npm i`
    - `cd Coursework`
    - `npm i`

## Running the Application

1. Run Back-end first:
    ```
    node server.mjs
    ```

2. Then run front-end:
    ```
    cd Coursework
    npm run dev
    ```

