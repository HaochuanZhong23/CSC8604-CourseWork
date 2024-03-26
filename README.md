Hi welcome to the web app source code of leaflink

//files in use

Back-end
pm.mjs -- Retrieve pm10 and pm2.5 data

    import {pm10, pm25} to get pm data

tempHum.mjs -- Retrieve temperature and humidity

    import {temperature, humidity, getCurrentValue} to get temperature and humidity
    getCurrentValue() is a call back

light.mjs -- Retrieve brightness from Microbit

    import { getLightValue } to get brightness
    getLightValue() is a call back

AllLight.mjs -- Control breathing light (Raspberry Pi LED)

    import { checkAndUpdateLight } and just call it to control breathing light

server.mjs -- Transmit different data via URLs

    http://localhost:3000/ + {url}
    url = /pm25
          /pm10
          /light
          /hum
          /temp

Front-end
humidity.jsx/light.jsx/pm10.jsx/pm25.jsx/temp.jsx -- Flow chart components (called in insight.jsx)
App.jsx -- Router management
Result.jsx -- Landing page, air quality summary, gateway
Insight.jsx -- Real-time flow charts
Suggestion.jsx -- Plant suggestion according to measured air quality

before running:
    npm i
    cd Coursework
    npm i

Run Back-end first:
    node server.mjs

Then run front-end:
    cd Coursework
    npm run dev

