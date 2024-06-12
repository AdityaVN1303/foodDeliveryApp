import React from 'react'
import { Default_Img, Upper_Img_Url } from '../utils/constants'
import UpperBodyShimmer2 from './UpperBodyShimmer2'
import { Link } from 'react-router-dom'

const RestaurantCard = ({Data}) => {
  return (
    Data && <div className="res-card w-72 rounded-md  mb-10 shadow-lg hover:shadow-2xl duration-300 p-2">
        <Link to={`/menu/${Data?.info?.id}`}>
        <img src={Data?.info?.cloudinaryImageId ? Upper_Img_Url+Data?.info?.cloudinaryImageId : Default_Img} alt="img" className='rounded-t-md h-40 w-full object-cover' />
        <div className="data">
        <h1 className='text-xl font-bold h-14'>{Data?.info?.name}</h1>
        <div className="info flex justify-start space-x-5 p-1">
           <p className='font-bold'>{Data?.info?.avgRating}⭐</p>
           <p className='font-bold'>{Data?.info?.sla?.deliveryTime} mins</p>
        </div>
        <p>{ Data?.info?.cuisines.join(", ").slice(0, 30)}..</p>
        <p>{Data?.info?.areaName}</p>
        </div>
        </Link>
    </div>
  )
}

export default RestaurantCard