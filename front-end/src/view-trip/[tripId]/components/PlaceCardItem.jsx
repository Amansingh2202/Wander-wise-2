/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// import { Button } from "../../../components/ui/button"
// import { GrMapLocation } from "react-icons/gr";

import { Link } from "react-router-dom"
import { useState,useEffect } from "react";
import { GetPlaceDetails } from '../../../service/GlobalApi';
import { PHOTO_REF_URL } from '../../../service/GlobalApi';

const PlaceCardItem = ({place}) => {
  const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
   place&&GetPlacePhoto();
  },[place])


  

  const GetPlacePhoto=async()=>{
   const data={

     textQuery:place.placeName
    }
  
   const result =await GetPlaceDetails(data).then(resp=>{

     const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
   setPhotoUrl(PhotoUrl)
   })
  }

  return (

     <Link to={'https://www.google.com/maps/search/?api=1&query='+place.geoCoordinates+","+ place.placeName} target='_blank'>
    <div className="border rounded-xl 2 bg-zinc-950   border-gray-900 mt-2 flex gap-5 hover:scale-105 transition-all "> 

        <img src={photoUrl?photoUrl:"/placeholder.jpg" }className=" w-[180px] h-[180px] object-cover rounded-xl mt-5 ml-2  mb-4"/>
         <div className="pb-2">
            <h2 className="font-bold pt-2 ">{place.placeName}</h2>
            <p className="text-xs text-slate-500 pt-2 ">{place.placeDetails}</p>
            <div className="flex  gap-5 pt-4">
            <h2 className="text-xs text-slate-500 pt-2 pb-1"> 🕙  {place.timeTravel}</h2>
            <h2 className="text-xs text-slate-500 pt-2 pb-1">  ⭐ {place.rating} Stars </h2>
            <h2 className="text-xs text-slate-500 pt-2 pb-1">  💸 {place.ticketPricing}</h2>
            </div>
            

         </div>
    </div>
    </Link>
  
  ) 
}

export default PlaceCardItem