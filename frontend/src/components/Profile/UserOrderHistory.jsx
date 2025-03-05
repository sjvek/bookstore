import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null); // Ensure the default state is null

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/get-order-history", { headers });
       // console.log(res.data);
        setOrderHistory(res.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {!orderHistory && <Loader />} {/* Show loader while fetching data */}
      
      {orderHistory && orderHistory.length === 0 && (
        <div className="text-center">
          <h1>No Order History</h1>
        </div>
      )}

      {orderHistory && orderHistory.length > 0 && (
        <div className="table-responsive"> {/* Makes table scrollable on small screens */}
          <table className="table table-dark table-striped" >
            <thead >
              <tr >
                <th scope="col"className='text-warning'>Sr.</th>
                <th scope="col" className='text-warning'>Books</th>
                {/* <th scope="col" className='text-warning  d-none d-lg-block'>Description</th> */}
                <th scope="col" className='text-warning'>Price</th>
                <th scope="col" className='text-warning'>Status</th>
                <th scope="col" className='text-warning  d-none d-lg-block'>Mode</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((v, i) => (
                <tr key={i} className=' '>
                  <th scope="row">{i + 1}</th>
                  <td>{v.book.title}</td>
                  {/* <td className='text-truncate  d-none d-lg-block text-truncate'>{v.book.desc.slice(0,50)}</td> */}
                  <td>₹ {v.book.price}</td>
                  <td className={v.status === "Order Placed" ? "text-success" : "text-warning"}>
                    {v.status}
                  </td>
                  <td className="text-secondary  d-none d-lg-block">COD</td>
                </tr>
                
              ))} 
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
