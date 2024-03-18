import React from 'react'
import { ReactDOM } from 'react-dom'
import '../insight.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Line } from '@ant-design/charts';


export default function PM10() {


    const [pm10Data, setpm10] = useState(null)
    const [time, setTime] = useState(0);
    const [data, setData] = useState([]);
    const [pm10Values, setpm10Values] = useState([]);

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
                const pm10Data = await fetchData('/pm10')
                setpm10(pm10Data.pm10)
                console.log(pm10Data)
                setpm10Values(prevValues => [...prevValues, pm10Data.pm10]);
                const newData = { time, value: pm10Data.pm10 }

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

    const averagePm10 = pm10Values.length > 0 ? (pm10Values.reduce((acc, val) => acc + val, 0) / pm10Values.length).toFixed(1) : null;

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
            <div className='pm10'>
                <p className='running-text font-default-black'>PM 10</p>
                <div className='spacing-xs'></div>
                <div className='heightControl'><DemoLine /></div>
                <div className='spacing-xs'></div>
                <p className='running-text font-default-black'>Average pm10</p>
                <h3 className='small-heading font-default-black' style={{ color: (averagePm10 > 500) ? 'red' : 'inherit' }}>{averagePm10}</h3>
                <div className='spacing-xs'></div>
                {averagePm10 !== null && (
                    <p className='small-text font-default-unimportant'>
                        { averagePm10 > 500 ? 'PM 10 too high' : ''}
                    </p>
                )}
            </div>
        </div>
    )
}
