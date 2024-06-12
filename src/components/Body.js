import React, { useContext } from 'react'
import RestaurantCard from './RestaurantCard'
import { useEffect , useState } from 'react'
import { SWIGGY_RESTAURANT_API_END_POINT } from '../utils/constants'
import UpperBody from './UpperBody'
import UpperBody2 from './UpperBody2'
import Places from './Places'
import UpperBodyShimmer2 from './UpperBodyShimmer2'
import getOnlineStatus from '../utils/useOnlineStatus'
import { useSelector } from 'react-redux'
import { LOCATION_API_KEY } from '../utils/constants'

const Body = () => {

  const status = getOnlineStatus();

  const city = useSelector((store)=> store.location.city);
  console.log(city);

  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);

  const getData = async ()=>{
    const location = await findLatLongByCity(city);

    if (location) {
      const data = await fetch(`${SWIGGY_RESTAURANT_API_END_POINT}lat=${location.lat}&lng=${location.lng}`);
      const response = await data.json();
      setData(response);
      setFilteredRestaurant(response?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
    else{
      const data = await fetch(`${SWIGGY_RESTAURANT_API_END_POINT}lat=12.9715987&lng=77.5945627`);
      const response = await data.json();
      setData(response);
      setFilteredRestaurant(response?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    getData();
  }, [city])


  // Geolocation API CODE ------------------------------

  async function findLatLongByCity(city) {
    setLoader(true);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${LOCATION_API_KEY}`;

    const value = await fetch(url);
    const answer = await value.json();
    console.log(answer);
    window.scrollTo(0, 0)
    setLoader(false);
    return answer.results[0]?.geometry;

  }
//  ----------------------------------------------------
  


  const [search, setSearch] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  
  
  const upperBodyData = data?.data?.cards[0];
  const upperBodyData2 = data?.data?.cards[1];
  const mainBodyData = data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  const places = data?.data?.cards[10];

  useEffect(() => {
    if (search && mainBodyData) {
      const searchTextLowerCase = search.toLowerCase()
            const tempFilteringRestaurants = mainBodyData.filter(({ info: { name } }) => name.toLowerCase().includes(searchTextLowerCase))
            setFilteredRestaurant(tempFilteringRestaurants);
    } else {
      setFilteredRestaurant(mainBodyData);
    }

  }, [search])

  


  return (
    <div className='body mx-10 my-5 font-abc pt-24'>
      { status ?
        <div className='min-body'>
        {
          !loader ? 
            <>
            <div className="search flex items-center justify-center">
             <input placeholder='Search Restaurants' type="text" className=' w-full h-10 rounded-md border-2 px-2 border-black' onChange={(e)=>{setSearch(e.target.value)}}/>
    </div>
    { !search && <UpperBody Data={upperBodyData}/>}
    <hr />
    <UpperBody2 Data={upperBodyData2} search={search} city={city}/>
    <hr />
    <h1 className='text-2xl font-bold mt-5'>Restaurants with online food delivery in {city}</h1>
    <div className='cards mt-10 flex justify-evenly items-center flex-wrap'>
    {
      filteredRestaurant ? filteredRestaurant.map((item)=>{
        return <RestaurantCard Data={item}/>
      }) : <UpperBodyShimmer2/>
    }
    </div>
    <hr />
    <Places Data={places}/>
    <hr />
            </> : <UpperBodyShimmer2/>
          
        }
        </div> : <h1 className='text-3xl font-bold m-5'>No Connection !!! Please Check your Internet Connection</h1>
      }
    </div>
  )
}

export default Body