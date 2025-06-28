import { useEffect } from "react"
import { Button } from "../ui/button"
import {googleLogout} from "@react-oauth/google"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { useState } from "react"




function Header() {
  const user = JSON.parse(localStorage.getItem('user')) 
  const [openDailog,setopenDailog]=useState(false);

  
  

  useEffect(() => {
    // console.log(user)
  }, [user]) 
  
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
   })

   const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      header:{
          Authorization:`Bearer ${tokenInfo?.access_token}`,
          Accept:"Application/json "
      }
    }).then((resp)=>{
      // console.log(resp)
      localStorage.setItem('user',JSON.stringify(resp.data));
      setopenDailog(false)
       window.location.reload()
    })
  
  }
   



  return (
    <div className='p-4 shadow-sm flex justify-between items-center px-5 bg-black'>
      <img src="/logo.svg" alt="Logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-5">
           
            <Popover>
  <PopoverTrigger>
  <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

  </PopoverTrigger>
  <PopoverContent className="bg-black border-black text-white pl-14 font-serif bg-slate-900 font-normal">
    <h1> Name  -:  {user?.name} , </h1>
    <h1>{user?.email}</h1>
  </PopoverContent>
</Popover>

            {/* <Popover>
                 <PopoverTrigger>
                 <Button variant="outline" className="rounded-full bg-lime-950 text-white border-none">
            Logout
            </Button>
                 </PopoverTrigger>
                 <PopoverContent className="bg-stone-900 border-black rounded-full ">
                  <h2  className=" cursor-pointer ml-24 text-white" onClick={()=>{
                    googleLogout();
                    localStorage.clear()
                    window.location.reload();
                  
                  }}>Logout</h2>
                 </PopoverContent>
            </Popover> */}
            <Button className=" cursor-pointer rounded-full bg-blue-700 text-white   border-none"
            onClick={()=>{
              googleLogout();
              localStorage.clear()
              window.location.reload();
            
            }}>Logout</Button>
           
           



            {/* <a href='/my-trips'>
            <Button variant="outline" className="rounded-full  bg-lime-950 text-white border-none">
              My-Trips
            </Button>
            </a> */}

         
          </div>
        ) : (
          <Button onClick={()=>setopenDailog(true)}>SignIn</Button> 
        )}
      </div>
      <Dialog open={openDailog}>
  
  <DialogContent>
    <DialogHeader>

      <DialogDescription>
       <img src='/logo.svg'/>
       <h2 className='font-bold text-lg mt-7'>Sign in  with Google </h2>
       <p>Sign in with Google Authentication Securely </p>
       <Button   onClick={login} className='mt-5 bg-slate-800 w-full flex gap-4 items-center'>
       <FcGoogle className='h-7 w-7' />
       Sign in with Google </Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export { Header }
