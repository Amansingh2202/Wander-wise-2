// import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { GetPlaceDetails } from '../../../service/GlobalApi';
import { PHOTO_REF_URL } from '../../../service/GlobalApi';

const HotelCardItem = ({hotel}) => {

    const [photoUrl,setPhotoUrl]=useState();
   useEffect(()=>{
    hotel&&GetPlacePhoto();
   },[hotel])


   

   const GetPlacePhoto=async()=>{
    const data={

      textQuery:hotel.hotelName
     }
    const result =await GetPlaceDetails(data).then(resp=>{
      // console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
    setPhotoUrl(PhotoUrl)
    })
   }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel.hotelName +"," +hotel?.hotelAddress } target='_blank'>
    <div className="hover:scale-110 transition-all">
    <img src={photoUrl?photoUrl:"/placeholder.jpg" } className="rounded-xl h-[250px] w-full object-cover "/>
    <div className="my-3  ">
      <h2 className="text-white py-2.5 font-serif font-extrabold">{hotel.hotelName}</h2>
      <h2 className="text-slate-300 text-xs mb-1">  {hotel?.hotelAddress}📍</h2>
      <h2 className="text-slate-300 text-sm  mb-1" > 💸{hotel?.price}</h2>
      <h2 className="text-slate-300 text-sm  mb-1 " >⭐ {hotel?.rating} Stars</h2>

      </div>

   </div>
   </Link>
  )
}

export default HotelCardItem