import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SWIGGY_RESTAURANT_DETAIL_API_END_POINT, Upper_Img_Url } from '../utils/constants'
import MenuShimmer from './MenuShimmer';
import { useDispatch} from 'react-redux';
import { addItem } from '../utils/cartSlice';

const ItemList = ({item}) => {
    const [showItem, setShowItem] = useState(false);

    const dispatch = useDispatch();

    const handleItem = (item)=>{
        dispatch(addItem(item));
    }



  return (
    <div className='headings' key={item?.card?.card?.title}>
                            <hr />
                            <div className='title flex justify-between items-center bg-blue-400 text-white p-2 cursor-pointer hover:bg-blue-500 duration-200' onClick={()=>{setShowItem(!showItem)}}>
                            <h1 className='font-bold text-3xl'>{item?.card?.card?.title}</h1>
                            <p className='text-3xl font-bold'>{showItem ? "-" : "+"}</p>
                            </div>
                            <hr />
                     { showItem &&
                        <div className="items">
                        {
                           item?.card?.card?.categories  ? 
                           item && item?.card?.card?.categories?.map((thread)=>{
                            return <div key={thread?.id}>
                               <h2 className='font-bold text-2xl  mt-5'>{thread?.title} 🔽</h2>
                                <hr />
                                <div className="sub-div">
                                    {
                                        thread?.itemCards?.map((piece)=>{
                                            return <div>
                                            <div className="item flex justify-between items-center space-y-5 mb-1">
                                    <div className="info">
                                        <p className="name text-xl font-bold">{piece?.card?.info?.name}</p>
                                        <p className="price font-bold">₹ {piece?.card?.info?.price ? (piece?.card?.info?.price)/100 : "Item Unavailable"}</p>
                                        <p className="description text-sm">{(!piece?.card?.info?.description || piece?.card?.info?.description?.length < 120) ? "Food models, also known as fake foods, food figurines or food samples (Japanese: 食品サンプル, romanized: shokuhin sampuru), are scale models or replicas of a food item or dish made from plastic, wax, resin, or a similar inedible material." : piece?.card?.info?.description}</p>
                                    </div>
                                    {piece?.card?.info?.imageId ? <img src={Upper_Img_Url + piece?.card?.info?.imageId} alt="img" className=' rounded-md w-24 object-cover' /> : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStOB26e6FqhS8YWtkvN0L3cbFpupGF5VN8XA&s" className='rounded-md w-24 object-cover' alt="img" /> }
                                    {piece?.card?.info?.price && <button onClick={()=>{handleItem(piece?.card?.info)}} className="adder bg-black text-white p-1 rounded-md relative bottom-10 right-16">Add</button>}
                                </div>
                                <hr />
                                        </div>
                                        })
                                    }
                                </div>
                            </div>
                        })
                           :
                           item && item?.card?.card?.itemCards?.map((thread)=>{
                            return <div>
                                <div className="item flex justify-between items-center space-y-5 mb-1">
                        <div className="info">
                            <p className="name text-xl font-bold">{thread?.card?.info?.name}</p>
                            <p className="price font-bold">₹ {thread?.card?.info?.price ? (thread?.card?.info?.price)/100 : "Item Unavailable"}</p>
                            <p className="description text-sm">{(!thread?.card?.info?.description || thread?.card?.info?.description?.length < 120) ? "Food models, also known as fake foods, food figurines or food samples (Japanese: 食品サンプル, romanized: shokuhin sampuru), are scale models or replicas of a food item or dish made from plastic, wax, resin, or a similar inedible material." : thread?.card?.info?.description}</p>
                        </div>
                        {thread?.card?.info?.imageId ? <img src={Upper_Img_Url + thread?.card?.info?.imageId} alt="img" className=' rounded-md w-24 object-cover' /> : <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStOB26e6FqhS8YWtkvN0L3cbFpupGF5VN8XA&s" className='rounded-md w-24 object-cover' alt="img" /> }
                        {thread?.card?.info?.price && <button onClick={()=>{handleItem(thread?.card?.info)}} className="adder bg-black text-white p-1 rounded-md relative bottom-10 right-16">Add</button>}
                    </div>
                    <hr />
                            </div>
                        })
                        }
                    </div>}
                            </div>
  )
}

export default ItemList