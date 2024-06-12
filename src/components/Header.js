import React from 'react'
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import { useSelector } from 'react-redux'

const Header = ({mode , setMode}) => {

  const cartStatus = useSelector((store)=>store.cart.items.length);

  const status = useOnlineStatus();

  return (
    <div className='header flex justify-between items-center font-abc bg-blue-400 p-6 text-white fixed left-0 right-0 top-0 z-10'>
    <Link to="/"><h1 className='text-2xl font-bold'>FoodApp</h1></Link>
    <ul className='flex justify-between items-center space-x-3'>
      <button className="toggler p-1 bg-purple-800 text-white rounded-md" onClick={()=>{setMode(mode)}}>{mode ? "Light" : "Dark"} Mode</button>
      {
        status ? <div>🟡</div> : <div>🔴</div>
      }
      <Link to="/grocery" className='font-bold'>Grocery</Link>
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/cart" className='bg-purple-950 p-1 rounded-sm space-x-1'>
      <span>Cart</span>
      {cartStatus == 0 ? <span></span> : <span className="count bg-purple-600 px-1">{cartStatus}</span>}
      
      </Link>
    </ul>
    </div>
  )
}

export default Header