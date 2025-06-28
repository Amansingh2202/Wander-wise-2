// /* eslint-disable react/jsx-key */
// import { collection, query, where ,} from "firebase/firestore";
// import { getDocs } from "firebase/firestore";
// import { useEffect ,useState} from "react"
// import { useNavigate } from "react-router-dom";
// import { db } from "../service/firebaseConfig";
// import  UserTripCardItem from "./components/UserTripCardItem";

// const MyTrips = () => {
//   const navigate = useNavigate();
//   const [userTrips,setUserTrips]=useState([])

//   useEffect(() => {
//     GetUserTrips();
//   }, []);

//   const GetUserTrips = async() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) {
//       navigate('/');  
//       return;
//     }
//      setUserTrips([])
//     const q=query(collection(db,'AItrips'),where('userEmail','==',user?.email))
//     const querySnapshot=await getDocs(q);
//     querySnapshot.forEach((doc)=>{
      
//         setUserTrips(prevVal=>[...prevVal,doc.data()])
//     })
     
//   }

//   return (
//     <div className="  bg-black pb-7 sm:px-10 md:px-32  xl:px-60 px-5 mt-0 text-white">  
//         <h2 className=" font-bold text-3xl text-white font-serif">My-Trips</h2>
//         <div>
//                   { {userTrips.map((trip,index)=>(
//                            <UserTripCardItem trip={trip} />      
//                   ))} }

//         </div>
//     </div>
//   );
// }

// export default MyTrips;
