import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Upper_Img_Url } from '../utils/constants';
import {clearCart, removeItem} from '../utils/cartSlice'

const Cart = () => {

  const cartItems = useSelector((store)=>store.cart.items);
  const dispatch = useDispatch()

  const deleteItem = (id)=>{
     dispatch(removeItem(id));
  }



  return (
    <div className="cart pt-24 max-w-3xl mx-auto pb-10 text-center">
      <button onClick={()=>{dispatch(clearCart())}} className="clear bg-black text-white p-4 rounded-md my-5">Clear Cart</button>
      {
        cartItems.length != 0 ? cartItems.map((item)=>{
          return <div>
          <div className="item flex justify-between space-x-10 items-center space-y-5 mb-1">
  <div className="info text-left">
      <p className="name text-xl font-bold">{item.name}</p>
      <p className="price font-bold">₹ {(item.price)/100}</p>
      <p className="description text-sm">{item.description}</p>
  </div>
  <div className='flex justify-between items-center'>
    <button onClick={()=>{deleteItem(item.id)}} className='bg-black text-white rounded-md p-3'>Delete</button>
  </div>
</div>
<hr />
      </div>
        })  : <h1 className='font-bold text-3xl m-3 text-center'>Cart Is Empty </h1>
      } 
      {
        cartItems.length != 0 && <button className="checkout bg-orange-400 text-white p-3 rounded-xl mt-10 w-64">
          Proceed to Pay
        </button>
      }
    </div>
  )
}

export default Cart