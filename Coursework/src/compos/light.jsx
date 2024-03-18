import React from 'react'
import { ReactDOM } from 'react-dom'
import '../insight.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Line } from '@ant-design/charts';

export default function Light() {

    const [lightData, setlight] = useState(null)
    const [time, setTime] = useState(0);
    const [data, setData] = useState([]);
    const [lightValues, setlightValues] = useState([]);

    useEffect(() => {
        async function fetchData(url) {
            try {
                const res = await fetch(`http://localhost:3000${url}`, {
                    //mode: 'no-cors',
                    method: 'get',
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                console.log(JSON.stringify(res))
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }
                const jsonData = await res.json();
                return jsonData;
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error)
                return [];
            }
        }

        async function getData() {
            try {
                const lightData = await fetchData('/light')
                setlight(lightData.value)
                console.log(lightData)
                setlightValues(prevValues => [...prevValues, lightData.value]);
                const newData = { time, value: lightData.value }

                setData(prevData => {
                    if (prevData.length >= 5) {
                        return [...prevData.slice(1), newData]
                    }
                    return [...prevData, newData]
                })
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }


        const intervalId = setInterval(() => {
            getData();
            setTime(time => time + 5);
            console.log(time)
        }, 10000);

        return () => clearInterval(intervalId);
    }, [time])

    const averagelight = lightValues.length > 0 ? (lightValues.reduce((acc, val) => acc + val, 0) / lightValues.length).toFixed(1) : null;

    const DemoLine = () => {
       const config = {
            data,
            xField: 'time',
            yField: 'value',
            point: {
                shapeField: 'square',
                sizeField: 2,
            },
            interaction: {
                tooltip: {
                    marker: false,
                },
            },
            style: {
                lineWidth: 2,
            },
        };
        return <Line {...config} />;
    };

    return (
        <div>
            <div className='light'>
                <p className='running-text font-default-black'>PM 2.5</p>
                <div className='spacing-xs'></div>
                <div className='heightControl'><DemoLine /></div>
                <div className='spacing-xs'></div>
                <p className='running-text font-default-black'>Average lightness</p>
                <h3 className='small-heading font-default-black'>{averagelight}</h3>
            </div>
        </div>
    )
}
