import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './Pages/Form';
import Blogs from './Pages/Blogs';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/blog/form' element={<Form />} />
          <Route path='/' element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
