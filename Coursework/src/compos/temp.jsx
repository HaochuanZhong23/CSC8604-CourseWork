import React from 'react'
import { ReactDOM } from 'react-dom'
import '../insight.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Line } from '@ant-design/charts';

export default function Temp() {

    const [tempData, settemp] = useState(null)
    const [time, setTime] = useState(0);
    const [data, setData] = useState([]);
    const [tempValues, settempValues] = useState([]);

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
                const tempData = await fetchData('/temp')
                const temperature = parseInt(tempData.temperature)
                settemp(temperature)
                console.log(temperature)
                settempValues(prevValues => [...prevValues, temperature]);
                const newData = { time, value: temperature }

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

    const averagetemp = tempValues.length > 0 ? (tempValues.reduce((acc, val) => acc + val, 0) / tempValues.length).toFixed(1) : null;

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
            <div className='temp'>
                <p className='running-text font-default-black'>Temperature</p>
                <div className='spacing-xs'></div>
                <div className='heightControl'><DemoLine /></div>
                <div className='spacing-xs'></div>
                <p className='running-text font-default-black'>Average Temperature</p>
                <h3 className='small-heading font-default-black' style={{ color: (averagetemp > 27 || averagetemp < 4) ? 'red' : 'inherit' }}>{averagetemp}</h3>
                <div className='spacing-xs'></div>
                {averagetemp !== null && (
                    <p className='small-text font-default-unimportant'>
                        {averagetemp < 4 ? 'Too cold' : averagetemp > 27 ? 'Too hot' : ''}
                    </p>
                )}
            </div>
        </div>
    )
}
