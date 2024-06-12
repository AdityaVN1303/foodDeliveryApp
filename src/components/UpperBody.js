import React from 'react'
import { useEffect, useState } from 'react'
import mockData from '../utils/mockData';
import UpperBodyShimmer from './UpperBodyShimmer';
import { Link } from 'react-router-dom';
import { Upper_Img_Url } from '../utils/constants';

const UpperBody = ({Data}) => {
    const iterator = Data?.card?.card?.imageGridCards?.info;

  return (
    <div className='upper-body my-10'>
        <h1 className='text-2xl font-bold'>What's on Your Mind ?</h1>
        <div className="sub flex justify-evenly flex-wrap">
            {
               iterator ? iterator.map((item)=>{
                    return <Link to={`/category/${item?.action?.link.slice(35, 41)}`}><img src={Upper_Img_Url+item?.imageId} alt="img" className='rounded-full w-40 object-cover' /></Link>
                } ) : <UpperBodyShimmer/>
            }
                
        </div>
    </div>
  )
}

export default UpperBody