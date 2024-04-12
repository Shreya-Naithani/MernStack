import React from 'react';
import { Route ,Routes} from 'react-router-dom';
import Home from './Pages/Home.jsx';
import CreateBlog from './Pages/CreateBlog.jsx';
import NavBar from './Components/NavBar.jsx';


function App() {


  return (
    <>
    <NavBar/>
   <Routes>
    <Route path="/home" element={<Home/>} />
    <Route path="/create" element={<CreateBlog/>}/>
   </Routes>
    </>
  )
}

export default App
