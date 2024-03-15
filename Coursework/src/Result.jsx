import React from 'react'
import './Result.css'
import { Link } from 'react-router-dom'
import add from './assets/icon/add.png'
import drop from './assets/icon/drop.png'
import pm25 from './assets/icon/pm25.png'
import pm10 from './assets/icon/pm10.png'
import light from './assets/icon/light.png'
import tempIcon from './assets/icon/temp.png'
import humidity from './assets/icon/humidity.png'
import { useEffect, useState } from 'react'

export default function Result() {

    const [data, setData] = useState({})

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
            const sensorData = await fetchData('/data')
            console.log(sensorData)
            setData(sensorData)
        }

        getData()
    }, [])


    return (
        <div className='mobile'>
            <div className='content'>
                <div className='container'>
                    <div className='top-wrapper'>
                        <h1 className='extra-large-heading font-default-black'>Welcome Back!</h1>
                        <div className='spacing-md'></div>
                        <h2 className='large-heading font-default-black'>My Pots</h2>
                        <div className='spacing-sm'></div>
                        <div className='image-wrapper'>
                            <div className='potImg'></div>
                            <div className='addPot'>
                                <img className='addIcon' src={add} alt='add'></img>
                            </div>
                        </div>
                    </div>
                    <div className='spacing-md'></div>
                    <div className='mid-wrapper'>
                        <h2 className='large-heading font-default-black'>Results</h2>
                        <div className='spacing-sm'></div>
                        <div className='result'>
                            <div className='spacing-sm'></div>
                            <div className='potNavWrapper'>
                                <div className='potNavLeft'>
                                    <div className='potItem active running-text'>Pot 1</div>
                                    <div className='potItem running-text font-default-offwhite'>Pot 2</div>
                                    <div className='potItem running-text font-default-offwhite'>Pot 3</div>
                                </div>
                                <div className='potNavRight'>
                                    <div className='dropDown'>
                                        <p className='small-text font-default-black'>Bedroom</p>
                                        <img src={drop} className='dropIcon'></img>
                                    </div>
                                </div>
                            </div>
                            <div className='spacing-xs'></div>
                            <div className='dataWrapper'>
                                <div className='dataItem'>
                                    <div className='upperWrap'>
                                        <img src={pm25} className='dataIcon'></img>
                                        <p className='small-text font-default-black'>PM 2.5</p>
                                    </div>
                                    <div className='spacing-xs'></div>
                                    <h3 className='small-heading font-default-black'>68</h3>
                                    <h3 className='small-heading font-default-black'>ug/m3</h3>
                                    <div className='spacing-xs'></div>
                                </div>
                                <div className='dataItem'>
                                    <div className='upperWrap'>
                                        <img src={pm10} className='dataIcon'></img>
                                        <p className='small-text font-default-black'>PM 10</p>
                                    </div>
                                    <div className='spacing-xs'></div>
                                    <h3 className='small-heading font-default-black'>80</h3>
                                    <h3 className='small-heading font-default-black'>ug/m3</h3>
                                    <div className='spacing-xs'></div>
                                </div>
                                <div className='dataItem'>
                                    <div className='upperWrap'>
                                        <img src={humidity} className='dataIcon'></img>
                                        <p className='small-text font-default-black'>Humidity</p>
                                    </div>
                                    <div className='spacing-xs'></div>
                                    <h3 className='small-heading font-default-black'>50</h3>
                                    <h3 className='small-heading font-default-black'>%</h3>
                                    <div className='spacing-xs'></div>
                                </div>
                                <div className='dataItem'>
                                    <div className='upperWrap'>
                                        <img src={light} className='dataIcon'></img>
                                        <p className='small-text font-default-black'>Temp</p>
                                    </div>
                                    <div className='spacing-xs'></div>
                                    <h3 className='small-heading font-default-black'>15</h3>
                                    <h3 className='small-heading font-default-black'>ºC</h3>
                                    <div className='spacing-xs'></div>
                                </div>
                                <div className='dataItem'>
                                    <div className='upperWrap'>
                                        <img src={tempIcon} className='dataIcon'></img>
                                        <p className='small-text font-default-black'>Light</p>
                                    </div>
                                    <div className='spacing-xs'></div>
                                    <h3 className='small-heading font-default-black'>72</h3>
                                    <h3 className='small-heading font-default-black'>%</h3>
                                    <div className='spacing-xs'></div>
                                </div>
                            </div>
                            <div className='spacing-md'></div>
                            <Link to='/insight' className='link-margin btn-link running-text font-default-black'>View more</Link>
                            <div className='spacing-sm'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
