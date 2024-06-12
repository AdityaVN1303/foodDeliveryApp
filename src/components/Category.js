import React, { useEffect, useState } from 'react'
import { SWIGGY_CATEGORY_API } from '../utils/constants'
import { useParams } from 'react-router-dom'
import RestaurantCard from './RestaurantCard'
import UpperBodyShimmer2 from './UpperBodyShimmer2'

const Category = () => {

    const [restaurants, setRestaurants] = useState([])
    const [title, setTitle] = useState("");

    const {id} = useParams();

    const getData = async ()=>{
        const data = await fetch(SWIGGY_CATEGORY_API + id);
        const response = await data.json();
        console.log(response.data.cards.slice(3));
        setRestaurants(response.data.cards.slice(3));
        setTitle(response.data.cards[0].card.card.title);
    }

    useEffect(() => {
        getData();
    }, [])
    

  return (
   <div className="above pt-24 pb-5">
    {restaurants.length && <h1 className='text-center font-bold text-3xl py-5'>Top Restaurants for {title}</h1>}
     { restaurants.length ?
        <div className="category flex justify-evenly items-center flex-wrap">
        {
            restaurants && restaurants.map((item)=>{
                return <RestaurantCard Data={item?.card?.card}/> 
            }) 
        }
    </div> : <UpperBodyShimmer2/>
    }
   </div>
  )
}

export default Category