import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='flex justify-center items-center font-bold gap-10 text-lg shadow-md py-3 '>
   <Link to="/home"> Home</Link>
  <Link to="/create">Create</Link>
    </nav>
  )
}

export default NavBar
