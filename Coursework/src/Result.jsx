import React from 'react'
import './Result.css'
import add from './assets/icon/add.png'
import { useEffect, useState } from 'react'

export default function Result() {

    const [temp, setTemp] = useState(null)

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
            const temperature = await fetchData('/temp')
            console.log(temperature)
            setTemp(temperature)
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
                </div>
            </div>
        </div>
    )
}
