/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
// import React from 'react'

import PlaceCardItem from "./PlaceCardItem"

const PlacesToVisit = ({trip}) => {
  return (

    <div className="text-white">
  
    <h2 className="font-bold text-large text-white text-xl mt-10">PlacesToVisit</h2>

    <div>
        {trip.TripData?.itinerary.map((item,index)=>(
            <div  >
                      <h2 className="text-white font-bold  pt-10 text-xl">{item.day}</h2>
                      <div className="grid md:grid-cols-2 gap-5">
                      {item.plan.map((place,index)=>(
                        <div className="my-3 ">
                            <h2 className="font-medium text-sm pb-2">{place.time}</h2>
                             <PlaceCardItem place={place}/>
                         </div>
                      ))}
                      </div>

            </div>
        ))}
    </div>
    </div>
  )


}

export default PlacesToVisit