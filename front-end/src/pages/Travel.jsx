/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useState } from 'react';
import {Input} from "../components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { setDoc,doc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { SelectBudgetOptions, SelectTravelsList } from '../constant/options';
import GoogleplacesAutocomplete from "react-google-places-autocomplete"
import { Button } from "../components/ui/button";
import { toast } from 'sonner';
import { AI_PROMPTS } from '../constant/options';
import { chatSession } from '../service/AIMODEL';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../service/firebaseConfig";



const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

    

function Travel() {
    
  const [formData,setformData]=useState([]);
  const [place,setPlace]=useState();
  const [openDailog,setopenDailog]=useState(false);
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()


  const handleInputChange = (name, value) => {
  setformData((prevData) => ({
    ...prevData,
    [name]: value
  }));
};


  useEffect(()=>{
    // console.log(formData);
  },[formData]) //when ever there  is change in formdata execute above call back-function
   
  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithGooglePopup();
      const user = response.user;
      console.log("User Info:", user);
      GetUserProfile(user.accessToken);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  






 const OnGenerateTrip=async()=>{

   
  
   const  user=localStorage.getItem('user');
   if(!user)
   {
          setopenDailog(true)
          return ;
   }



  if(formData?.noOfdays>11 &&!formData?.destination||!formData?.budget||!formData?.travelers)
  {   toast("Please fill in information correctly", {
    className: "fixed mb-20 pl-12 left-1/2 transform -translate-x-1/2 max-w-sm p-3 bg-red-500 text-white text-center rounded-lg shadow-md"
  });
  return;
  }
  setloading(true)
  const FINAL_PROMPT= AI_PROMPTS.replace('{destination}',formData?.destination?.label)
  .replace('{noOfdays}',formData?.noOfdays )
  .replace('{traveler}',formData?.travelers)
  .replace('{budget}',formData?.budget)
  .replace('{noOfdays}',formData?.noOfdays )



  const result =await chatSession.sendMessage(FINAL_PROMPT);
  // console.log(FINAL_PROMPT);
  // console.log(result?.response?.text())
  const TripData=result?.response.text()
  SaveAiTrip(TripData)
  setloading(false)

 }

 const SaveAiTrip=async(TripData)=>{
   
   setloading(true)
  const user =JSON.parse(localStorage.getItem('user'));
  const docId=Date.now().toString()

await setDoc(doc(db,"AItrips",docId),{
   userSelection:formData,
   TripData:JSON.parse(TripData),
   userEmail:user?.email,
   id:docId

  })
  setloading(false)
  navigate('/view-trip/'+docId)

}


 
 const GetUserProfile=(tokenInfo)=>{
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
    header:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:"Application/json "
    }
  }).then((resp)=>{
    // console.log(resp)
    localStorage.setItem('user',JSON.stringify(resp.data));
  
    OnGenerateTrip();
    setopenDailog(false)
  })

}

 
  return (   
    <div className="  bg-black">
      <div  id='main div ' className= ' pb-7 sm:px-10 md:px-32  xl:px-60 px-5 mt-0 '>
        <h1 className='font-bold text-3xl mt-0 text-white'>
          Welcome, Adventurer! Ready to Plan Your Perfect Trip?
        </h1>
      
        <p className='mt-0  text-gray-400 text-xl'>
          Let’s get started! Enter your preferences, and we’ll craft an unforgettable journey just for you.
        </p>

          <div className='mt-20 '>
              <div>
               <h2  className='text-white  font-medium text-xl'> Enter the destination </h2>
               <GoogleplacesAutocomplete 
                      apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                      selectProps={{
                       place,
                       onChange: (v) => {   
                        setPlace(v);
                       handleInputChange('destination', v);
    }
  }}
/>

            
              </div>
              <div className='mt-7'>

                <h2 className='text-white font-medium text-xl'>Enter the no. of days</h2>
                  <Input placeholder="Ex. 3  " type="number"
                  
                  onChange={(e)=>handleInputChange('noOfdays',e.target.value)}


                  />
              </div>

          </div>


          <div id='budget-people-count ' className='mt-7'>
          <h2  className='text-white  font-medium text-xl'>What is your Budget</h2>
          <div id='budget data ' className='grid grid-cols-3 gap-5 mt-5' >

            {SelectBudgetOptions.map((item,index)=>
            (            // CONDITIONAL CSS 
                  <div key={index} className={`p-4 rounded-lg text-white mt-2 hover:shadow   cursor-pointer ${formData?.budget==item.title ? 'text-black bg-red-300':'bg-zinc-700'}   `}
                  onClick={(e)=>handleInputChange('budget',item.title)}
                  
                  >
                      <h2 className='text-xl' >{item.icon}</h2>
                      
                      <h2 className=' font-bold'  >{item.title}</h2>
                      <h2 className=' text-sm '>{item.desc}</h2>
                      
                    </div>   
            ))}

          </div>



          <h2  className='text-white  font-medium text-xl mt-8'>Who do you plan  on travelling with on your next adventure ?</h2>
          <div id='people data ' className='grid grid-cols-3 gap-5 mt-5 ' >

            {SelectTravelsList.map((item,index)=>
            (
                  <div key={index} className={`p-4 rounded-lg  text-white mt-2 hover:shadow  cursor-pointer  ${formData?.travelers==item.people ?  ' text-black bg-red-300 ':' bg-zinc-700'}`}
                  onClick={(e)=>handleInputChange('travelers',item.people)
                  
                  }
                   >
                      <h2 className=' text-xl'>{item.icon}</h2>
                      <h2 className=' font-bold'>{item.people}</h2>
                      <h2 className=' text-sm '>{item.title}</h2>
                      
                    </div>   
            ))}

          </div>  
                            
          </div>
              
         <div className=' justify-end flex'>
         <Button  disabled={loading} onClick={OnGenerateTrip}>
         {loading ? (
  <div className="flex justify-center items-center min-h-screen">
    <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" />
  </div>
) : (
  "Generate Trip"
)}

          
          
         </Button>

         </div>
      </div>

      <Dialog open={openDailog}>
  
  <DialogContent>
    <DialogHeader>

      <DialogDescription>
       <img src='/logo.svg'/>
       <h2 className='font-bold text-lg mt-7'>Sign in  with Google </h2>
       <p>Sign in with Google Authentication Securely </p>
       <Button onClick={handleInputChange} className='mt-5 bg-slate-800 w-full flex gap-4 items-center'>

       
       <FcGoogle className='h-7 w-7' />
       Sign in with Google 
      
       </Button>
    
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
          
    </div>
  );
}

export { Travel };
