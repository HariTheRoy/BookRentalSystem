import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookCard.css";
const BookCard = (props) => {
  const navigate = useNavigate();
  // console.log("in book card props.id >>>> ", props.id);
  const getDetailsHandler = () => {
    navigate(`/bookdetails/${props.id}`);
  };
  return (
    <li style={{ padding: "20px 20px" }}>
      <div id="container">
        <div class="card">
          <img
            src={`${process.env.REACT_APP_ASSET_URL}/img/books/${props.images[0]}`}
            alt={`${props.images[0]}`}
          />
          <div class="card__details">
            {/* <span class="tag">{props.room_type}</span> */}

            <div class="name">{props.bookname} </div>

            
            <span style={{ fontSize: "20px", color: "black" }}>
              ₹{props.price}
            </span>
            <span style={{ color: "darkgrey" }}>/month</span>

            
            <button style={{ marginTop: "30px" }} onClick={getDetailsHandler}>
              Book Details
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default BookCard;
