
// import  Bookcard from '../components/Bookcard/Bookcard';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Loader from "../components/Loader/Loader";

// const Allbooks = () => {
    
//   const [Data, setData] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(
//         "https://bookstore-yqad.onrender.com/api/v1/get-all-book"
//       );
//       // console.log(response.data.data);
//       setData(response.data.data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className='bg-dark vh-100  p-5 w-100 '>
//       <br />
//       <h1 className='text-light mx-5 mb-5' >All books</h1>
//       {!Data && (
//         <div>
//           <Loader />
//         </div>
//       )}
//       <div className="row gap-3 h-auto w-100 ">
//         {Data &&
//           Data.map((items, i) => (
//             <div
//               className="col-xs-12 col-sm-12  col-md-5 col-lg-2    text-center "
//               key={i}
//             >
//               <Bookcard data={items} />{" "}
//             </div>
//           ))}
//       </div>
//         </div>
  
//   )
// }

// export default Allbooks

import Bookcard from "../components/Bookcard/Bookcard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Loader from "../components/Loader/Loader";

const Allbooks = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bookstore-yqad.onrender.com/api/v1/get-all-book"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-dark vh-100 p-5 w-100 overflow-auto">
      <h1 className="text-light text-center mb-5">All Books</h1>

      {!Data && <Loader />}

      <div className="container">
        <div className="row justify-content-center gap-3">
          {Data &&
            Data.map((items, i) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
                key={i}
              >
                <Bookcard data={items} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Allbooks;
