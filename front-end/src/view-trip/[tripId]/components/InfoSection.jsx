/* eslint-disable react/prop-types */

import { Button } from "../../../components/ui/button"
import { FiSend } from "react-icons/fi";
import { GetPlaceDetails } from "../../../service/GlobalApi";
import { useEffect } from "react";
import { useState } from "react";
import { PHOTO_REF_URL} from "../../../service/GlobalApi";


 

const InfoSection = ({trip}) => {
  
 const [photoUrl,setPhotoUrl]=useState();
   useEffect(()=>{
    trip&&GetPlacePhoto();
   },[trip])


   

   const GetPlacePhoto=async()=>{
    const data={

      textQuery:trip?.userSelection?.destination?.label
     }
    const result =await GetPlaceDetails(data).then(resp=>{
      // console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name)
    setPhotoUrl(PhotoUrl)
    console.log({trip})
    
    })
   }

  return (
    <div  className="flex ">
        <img src={photoUrl?photoUrl:"/placeholder.jpg" } className="h-[380px] w-[500px] object-cover rounded-xl"/>

        <div className="flex justify-between  ">

         <div className="  flex flex-col gap-2 text-white  pl-10  ">
            <h2 className="text-white font-bold ">{trip?.userSelection?.destination?.label} </h2>
            <div className="flex gap-5   ">
                <h2 className=" px-3 pt-1 bg-slate-600 rounded-full text-white  h-6 text-xs md:text-md items-center " > 📅 {trip.userSelection?.noOfdays} Days</h2>
                <h2 className=" px-3 pt-1 bg-slate-600 rounded-full text-white  h-6 text-xs md:text-md" > 💰 Budget  {trip.userSelection?.budget}</h2>
                <h2 className=" px-3 pt-1 bg-slate-600 rounded-full text-white  h-6 text-xs md:text-md " > ✈️  For {trip.userSelection?.travelers}</h2>
                
                {/* <Button className="bg-slate-600  ml-2 h-6 "><FiSend /></Button> */}
            </div>
            {/* <h2 className="   font-serif   h-6 text-white  pt-5 " >   {trip?.TripData?.destinationData}</h2> */}
              
         </div>

       
         </div>

    </div>

    

      

  )
}

export default InfoSection