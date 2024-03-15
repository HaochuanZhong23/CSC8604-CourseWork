import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Result from './Result';
import Suggestion from './Suggestion';
import insight from './insight';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Result}></Route>
        <Route path='/suggestion' Component={Suggestion}></Route>
        <Route path='/insight' Component={insight}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
