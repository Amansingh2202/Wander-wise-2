import { useParams } from "react-router-dom"
import { db } from "../../service/firebaseConfig";
import { doc,getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/Footer";


function  Viewtrip(){
    const {tripId}=useParams();
    const [trip,setTrip]=useState([])
     
useEffect(()=>{
    tripId&&GetTripData();
},[tripId])

     const GetTripData=async()=>{
        const docRef=doc(db,"AItrips",tripId);
        const docSnap=await getDoc(docRef)
      
      if(docSnap.exists()){
        // console.log("Document:" ,docSnap.data())
        setTrip(docSnap.data())
      }
      else{
        // console.log("No such Document ");
        
      }
      }

  return (

    <div  className="  pb-20 sm:px-10 md:px-32  xl:px-60 px-5 mt-0 bg-black">
        <InfoSection trip={trip}/>
        <Hotels trip={trip}/>
        <PlacesToVisit trip={trip}/>
        <Footer trip={trip}/>
     </div>    
  )
}

export default  Viewtrip