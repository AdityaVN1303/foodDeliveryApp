import React from 'react'
import UpperBodyShimmer from './UpperBodyShimmer';
import RestaurantCard from './RestaurantCard';
import UpperBodyShimmer2 from './UpperBodyShimmer2';
import { useState , useEffect} from 'react';

const UpperBody = ({Data, search, city}) => {
  const [iterator, setIterator] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [filterStyle1, setFilterStyle1] = useState("bg-white text-black");
  const [filterStyle2, setFilterStyle2] = useState("bg-white text-black");
  const [filterStyle3, setFilterStyle3] = useState("bg-white text-black");


  useEffect(() => {
    if (search && iterator) {
      const searchTextLowerCase = search.toLowerCase()
            const tempFilteringRestaurants = iterator.filter(({ info: { name } }) => name.toLowerCase().includes(searchTextLowerCase))
            setFilteredRestaurant(tempFilteringRestaurants);
    } else {
      setFilteredRestaurant(iterator);
    }

  }, [search])

    useEffect(() => {
      setIterator(Data?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setFilteredRestaurant(Data?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }, [Data])


    // Filter Functions Below
    const toggleRating = ()=>{
      const tempFilteringRestaurants = filteredRestaurant.filter(({ info: { avgRating } }) => avgRating >= 4.5);
            setFilteredRestaurant(tempFilteringRestaurants);
            setFilterStyle1("bg-black text-white")
    }

    const toggleDeliveryTime = ()=>{
      const tempFilteringRestaurants = filteredRestaurant.filter((item) => item.info.sla.deliveryTime <= 30);
            setFilteredRestaurant(tempFilteringRestaurants);
            setFilterStyle2("bg-black text-white")
    }

    function filterNumbersLessThan300(arr) {
      return arr.filter((item) => {
    
        const [priceString, rest] = item.info.costForTwo.split(' ', 1); // Split at first space
        const price = parseFloat(priceString.replace('₹', '')); // Remove ₹ and convert to number
    
        return !isNaN(price) && price < 300; // Check if number and less than 300
      });
    }

    const togglePrice = ()=>{
            setFilteredRestaurant(filterNumbersLessThan300(filteredRestaurant));
            setFilterStyle3("bg-black text-white")
    }


    
    

  return (
    <div className='upper-body my-10'>
        <h1 className='text-2xl font-bold'>Top Restaurant Chains in {city}</h1>

        {/* Filter Below*/}
        <div className="filters flex lg:justify-start justify-center">
        <button onClick={()=>{toggleRating()}} className={`item border-2 border-black rounded-md p-3 m-3 ${filterStyle1}`}>
            Rating Above 4.5
        </button>
        <button onClick={()=>{toggleDeliveryTime()}}   className={`item border-2 border-black rounded-md p-3 m-3 ${filterStyle2}`}>
            Fast Delivery 
        </button>
        <button onClick={()=>{togglePrice()}}   className={`item border-2 border-black rounded-md p-3 m-3 ${filterStyle3}`}>
            Cost Less than 300
        </button>
        <button onClick={()=>{setFilteredRestaurant(iterator);  setFilterStyle1("bg-white text-black"); setFilterStyle2("bg-white text-black"); setFilterStyle3("bg-white text-black")}} className="item border-2  border-purple-950 rounded-md p-3 m-3">Clear All Filters</button>
    </div>
    {/* Filter End */}

        <div className='cards mt-10 flex justify-evenly items-center flex-wrap'>
            {
                filteredRestaurant ? filteredRestaurant.map((item)=>{
                    return <RestaurantCard Data={item}/>
                }) : <UpperBodyShimmer2/>
            }
</div>
    </div>
  )
}

export default UpperBody