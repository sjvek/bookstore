import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Bookcard from '../Bookcard/Bookcard'

const Favourites = () => {

 const [Favbook, setFavbook] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }

useEffect(() => {
const fetch = async () => {
  const response = await axios.get("http://localhost:3001/api/v1/get-fav-book" , {headers});
  setFavbook(response.data.data)
};
 fetch();
 } ,[Favbook]
)
  
  return (
    <>
  {Favbook.length === 0 ? (
    <div className="fs-3 text-center">No Favourite Books</div>
  ) : (
    <div className="row g-4 w-100 align-items-center m-1">
      {Favbook.map((items, i) => (
        <div key={i} className="col-12 col-sm-12 col-md-6 col-lg-5 ">
          <Bookcard data={items} favourite={true} />
        </div>
      ))}
    </div>
  )}
</>
  )
}

export default Favourites

