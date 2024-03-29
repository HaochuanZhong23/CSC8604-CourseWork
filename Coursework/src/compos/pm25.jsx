import React from 'react'
import { ReactDOM } from 'react-dom'
import '../insight.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Line } from '@ant-design/charts';

export default function PM25() {
    //get and set data
    const [pm25Data, setPm25] = useState(null)
    const [time, setTime] = useState(0);
    const [data, setData] = useState([]);
    const [pm25Values, setPm25Values] = useState([]);

    // get data from urls
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
                const pm25Data = await fetchData('/pm25')
                setPm25(pm25Data.pm25)
                console.log(pm25Data)
                setPm25Values(prevValues => [...prevValues, pm25Data.pm25]);
                const newData = { time, value: pm25Data.pm25 }

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

    //count the average pm25
    const averagePm25 = pm25Values.length > 0 ? (pm25Values.reduce((acc, val) => acc + val, 0) / pm25Values.length).toFixed(1) : null;

    // initialize antd chart
    const DemoLine = () => {
       const config = {
            data, // inject data array here
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
            <div className='pm25'>
                <p className='running-text font-default-black'>PM 2.5</p>
                <div className='spacing-xs'></div>
                <div className='heightControl'><DemoLine /></div>
                <div className='spacing-xs'></div>
                <p className='running-text font-default-black'>Average pm2.5</p>
                <h3 className='small-heading font-default-black' style={{ color: (averagePm25 > 121) ? 'red' : 'inherit' }}>{averagePm25}ug/m3</h3>
                <div className='spacing-xs'></div>
                {averagePm25 !== null && (
                    <p className='small-text font-default-unimportant'>
                        { averagePm25 > 121 ? 'PM 2.5 too high' : ''}
                    </p>
                )}
            </div>
        </div>
    )
}
