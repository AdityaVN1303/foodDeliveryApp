import React from 'react'

const MenuShimmer = () => {
  return (
    <div className="shimmerMenu flex justify-center items-center flex-col space-y-10 my-10">
        <div className='header animate-pulse bg-slate-400 w-2/5 h-20'>

        </div>
        <div className="box animate-pulse bg-slate-400 w-2/5 h-52">

        </div>
        <div className="menu animate-pulse bg-slate-400 w-2/5 h-32">

        </div>
        <div className="menu animate-pulse bg-slate-400 w-2/5 h-96">

        </div>
    </div>
  )
}

export default MenuShimmer