import axios from "axios";
import React, { useEffect, useState } from "react";
import Bookcard from "../Bookcard/Bookcard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Loader from "../Loader/Loader";

const Recentlyadded = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://bookstore-yqad.onrender.com/api/v1/get-recent-book"
      );
      // console.log(response.data.data);
      setData(response.data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-dark p-3  h-auto">
      <h2 className="text-warning mx-5 mb-5">Recently Added Books</h2>
      {!Data && (
        <div>
          <Loader />
        </div>
      )}
      <div className="row grid gap-3 mx-5">
        {Data &&
          Data.map((items, i) => (
            <div
              className="col-xs-12 col-sm-6 col-md-4 col-lg-2    text-center "
              key={i}
            >
              <Bookcard data={items} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recentlyadded;
