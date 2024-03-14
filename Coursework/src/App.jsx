import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Result from './Result';
import Suggestion from './Suggestion';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Result}></Route>
        <Route path='/suggestion' Component={Suggestion}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
