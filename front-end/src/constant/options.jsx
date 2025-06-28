export const SelectTravelsList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A solo traveler in exploration',
      icon: '👼',
      people: '1'
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two travelers in tandem',
      icon: '👩‍❤️‍👩',
      people: '2'
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A group of fun-loving adventurers',
      icon: '👨‍👩‍👦',
      people: '3 to 5 people'
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A bunch of thrill-seekers',
      icon: '🛖',
      people: '5 to 10 people'
    }
  ];
  

   export  const SelectBudgetOptions=[
      {
         id:1,
         title:"cheap",
         desc:'stay conscious of costs',
         icon: '😄'



      },


      {
        id:2,
        title:"Moderate",
        desc:'keep cost on the average side',
        icon:   '🍨'



     },
     {
        id:3,
        title:"Luxury",
        desc:'Dont worry about cost',
        icon: '🍷' 



     },




   ]


   export const AI_PROMPTS='Generate travel Plan for Location :{destination}  ,for {noOfdays} days   for {traveler} with  a  {budget} , give me a hotels options list with hotelname , hotle address , price , hotel image url ,geo coordinates , rating , description and sugggest  itinerary with placeName , place details , place image url , geo coordinates , ticket pricing , rating , time travel , each of the location for {noOfdays} with each day plan with best time to vist in json format';