/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom"
import HotelCardItem from "./HotelCardItem"



const Hotels = ({trip}) => {
  return (
    <div>
       <h2 className="font-bold text-xl mt-5 text-white">Hotel Recommendations</h2>
      <div className=" mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" >
               {trip?.TripData?.hotelOptions?.map((hotel,index)=>(
               <HotelCardItem hotel={hotel}/>
     ))}

      </div>
    </div>
  )
}

export default Hotels