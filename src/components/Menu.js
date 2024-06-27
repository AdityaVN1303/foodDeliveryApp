import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SWIGGY_RESTAURANT_DETAIL_API_END_POINT, Upper_Img_Url } from '../utils/constants'
import MenuShimmer from './MenuShimmer';
import ItemList from './ItemList';

const Menu = () => {

    const [menu, setMenu] = useState([]);
    

    const getData = async ()=>{
        const data = await fetch(SWIGGY_RESTAURANT_DETAIL_API_END_POINT + id);
        const response = await data.json();
        setMenu(response?.data?.cards);
    }

    useEffect(() => {
        console.log(menu);
      getData();
      console.log(menu);
    }, [])
    const {id} = useParams();


  return (
    <div className='pt-24 px-5'>
        {
            menu?.length == 0 ? <MenuShimmer/> : <div className="menu my-10 font-abc max-w-3xl mx-auto flex-col space-y-10">
            <h1 className='text-3xl font-bold'>{menu?.[0]?.card?.card?.text} - Menu</h1>
        <div className="header flex items-center flex-col space-y-3">
            <div className="box border-2 border-black p-3 space-y-3 rounded-md shadow-xl">
                <div className="up flex justify-between">
                    <p className='font-bold text-lg'>{menu[2]?.card?.card?.info?.avgRating} ⭐</p>
                    <p className='font-bold text-lg'>{menu[2]?.card?.card?.info?.costForTwoMessage}</p>
                </div>
                <div className="cuisines font-bold underline text-orange-600">{menu[2]?.card?.card?.info?.cuisines?.join(", ")}</div>
                <hr />
                <div className="area">{menu[2]?.card?.card?.info?.locality} , {menu[2]?.card?.card?.info?.areaName}</div>
                <hr />
                <div className="distance flex justify-between space-x-5 items-center">
                    <p>{menu[2]?.card?.card?.info?.sla?.deliveryTime} mins to Deliver approx </p>
                <p className='font-bold text-sm'>Delivery fees applicable. Delivered & charged by the restaurant. Buy <span className='text-blue-600 font-bold'>Swiggy Prime</span> to Save !</p>
                </div>
            </div>
        </div>
        <div className="offers">
            <h1 className='text-3xl font-bold my-3'>Deals for You</h1>
            <div className="deals flex justify-start space-y-3 space-x-5 items-center flex-wrap">
                {
                    menu && menu?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers.map((item)=>{
                        return <div className="deal border-2 border-black rounded-md p-2 font-bold cursor-pointer" key={item?.info?.couponCode}>
                        <p className='text-lg'>{item?.info?.header}</p>
                        <p className='text-sm text-gray-500'>{item?.info?.couponCode}</p>
                    </div>
                    }).slice(0, 4)
                }
            </div>
        </div>
        <div className="main-menu space-y-2">
            <div className="upper">
            <hr />
            <h1 className='text-4xl font-bold text-center'>MENU</h1>
            </div>
            <div className="lower">
                <div className="category">
                    {
                        menu && menu?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((item)=>{
                            return <ItemList item={item} key={item?.card?.card?.title}/>
                        }).slice(2 , menu?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.length-2)
                    }
                    </div>
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default Menu