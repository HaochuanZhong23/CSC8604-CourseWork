import React from 'react'
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
        <div>
            <p className="read-the-docs">
                {temp}
            </p>
        </div>
    )
}
