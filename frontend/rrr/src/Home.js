import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./Home.css";

const Home = (props) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const searchSubmit = (e) => {
    e.preventDefault();
    navigate(`/allbooks?q=${query}`);
  };

  return (
    <React.Fragment>
      <div className="bi">
        <div className="home-info">
          <div className="home-text">
            <h1>Read Rise Reform!</h1>
            <p>
              You can Borrow the books here!!!!
            </p>
            <br></br>
            <br></br>
            <div className="allbooks">
            <Link style={{textDecoration: 'none', color: 'black'}} to="/allbooks" state={{ fontWeight: "bold"}}>
              <b>All Available Books</b>
            </Link>
            </div>
          </div>
        
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
