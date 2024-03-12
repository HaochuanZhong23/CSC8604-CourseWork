import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [temp, setTemp] = useState(null)

  useEffect(() => {
    async function fetchData(url) {
      try {
        const res = await fetch(`http://localhost:3000${url}`, {
          mode: 'no-cors',
          method: 'get',
          headers: {
            "Content-Type": "application/json"
          },
        })
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
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {temp}
      </p>
    </>
  )
}

export default App
