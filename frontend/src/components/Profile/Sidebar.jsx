import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";


const Sidebar = ({ data }) => {  

  const dispatch = useDispatch();
 const history = useNavigate();

  return (
    <div className=" d-flex align-items-center justify-content-center  h-100 w-100 rounded-2 "
      style={{ backgroundColor: "#171717", height: "100%", width:"100%" }}>
    
      <div className=" text-center ">
        <img
          src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"
          alt="/"
          className="img-fluid rounded-circle  " style={{width: "150px", height: "150px", objectFit: "cover"}}
        />
        <p className="text-light mt-4 fs-3 fw-bold">{data.username}</p>
        <p className="text-light">{data.email}</p>
        <hr className="text-light" />
<br />
    <div className="text-center w-full text-decoration-none mt-2  ">  
        <Link to ="/profile" className="text-decoration-none fw-bold fs-4 text-light-emphasis hover  m-1 p-1" > Favourites  </Link> <br /><br />
        <Link to ="/profile/orderHistory" className="text-decoration-none fw-bold fs-4 text-light-emphasis r m-1"> Order History  </Link> <br /><br />
        <Link to ="/profile/settings" className="text-decoration-none fw-bold fs-4 text-light-emphasis  m-1 "> Settings  </Link><br />
    </div>
      
<br /><br />
    <button type="button" className="btn btn-dark mt-5 w-100 d-flex align-items-center justify-content-center "
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
    
    
    >
        Log Out</button>
      

       </div>
    </div>
  );
};

export default Sidebar;
