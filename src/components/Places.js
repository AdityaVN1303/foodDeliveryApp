import React from 'react'
import { useDispatch } from 'react-redux';
import {setCity} from '../utils/locationSlice'

const Places = ({Data}) => {
    const info = (Data?.card?.card?.cities)?.slice(0, 20);

    const dispatch = useDispatch();

    const sendData = (data) =>{
        dispatch(setCity(data));
    }

  return (
   <div className="bottom">
    <h1 className='text-2xl font-bold my-5'>Best Places to Eat Across Cities</h1>
     <div className="places flex justify-start items-center flex-wrap">
        {
            info && info.map((item)=>{
                return(
                    <button onClick={()=>{sendData(item.text)}} className="item border-2 border-black rounded-md hover:bg-purple-950 hover:text-white duration-300 p-3 m-3">
            Best Restaurants in {item?.text}
        </button>
                )
            })
        }
    </div>
   </div>
  )
}

export default Places