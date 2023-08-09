import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";

import LoadingSpinner from "../UIElements/LoadingSpinner";
import ErrorModal from "../UIElements/ErrorModal";
import SuccessModal from "../UIElements/SuccessModal";

import ImageSlider from "../ImageComponents/ImageSlider";

import "./BookDetails.css";


const BookDetails = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { bookId } = useParams("bookId");
  console.log("In book details >Book Id >>>", bookId);
  const [loadedBook, setLoadedBook] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`
        );
        const responseData = await response.json();
        console.log("Response Data >>>", responseData);
        if (responseData.status === "fail" || responseData.status === "error") {
          throw new Error("Given book ID Is Not valid");
        }
        console.log(
          "In BookDetials >Response Data.data >>>",
          responseData.data
        );
        setLoadedBook(responseData.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Error While getting book Details By Id");
        console.log("Error While getting book Details By Id");
      }
    };
    getBookDetails();
  }, [bookId]);

  const deleteBookHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = await response.json();
      console.log("in book details response data >>>", responseData);
      if (responseData.status === "fail" || responseData.status === "error") {
        throw new Error(responseData.message || "Error While Deleting book");
      }
      setIsLoading(false);
      setSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Error While Deleting book ");
    }
  };

  const updateClickHandler = () => {
    navigate(`/updatebook/${bookId}`);
  };
  const errorHandler = () => {
    setError(null);
  };

  const successHandler = () => {
    setSuccess(false);
    navigate("/mybooks");
  };
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <div id="book_details_page">
      <div className="bookdetails-header"><h1>Book and Owner Details</h1></div>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <SuccessModal
        success={success}
        successMessage="Book Deleted Successfully!"
        onClear={successHandler}
      />
      {!isLoading && loadedBook && (
        <div id="book_details">
          <div className="book_header">
            <h1>{loadedBook.title}</h1>
          </div>
          <div class="image_slider">
            <div style={containerStyles}>
              <ImageSlider
                slides={loadedBook.images}
                prePath={`${process.env.REACT_APP_ASSET_URL}/img/books`}
              />
            </div>
          </div>
          {/* <ul style={{ borderTop: "2px solid green", marginTop: "30px" }}> */}
          <ul className="details-background">
            <li>
              <h4>Book Information : </h4>
              <div className="listing_information">
                <div className="address">
                  <span>Author :</span>
                  <br></br>
                  <span className="answer">
                    {loadedBook.author}
                  </span>
                </div>
                <br></br>
  
                <br></br>
                <div>
                  <label>Rent :</label>
                  <span className="answer">
                    {"   ₹"}
                    {loadedBook.price}
                    {"/month"}
                  </span>
                </div>
                <br></br>
                
                <br></br>
                <div className="listing_description">
                  Description :
                  <span className="answer">{loadedBook.description}</span>
                </div>
              </div>
            </li>
            <li>
              <h4>Contact Information : </h4>
              <div className="listing_contact">
                <label>
                  Phone <i class="fa fa-phone" aria-hidden="true"></i> :{" "}
                  <span className="answer">{loadedBook.phone}</span>
                </label>
                <br></br>
                <br></br>

                <label>
                  E-mail <i class="fa fa-envelope" aria-hidden="true"></i> :{" "}
                  <span className="answer">{loadedBook.email} </span>
                </label>
                <br></br>
                <br></br>
               
              </div>
            </li>
            {auth.userId === loadedBook.creator && (
              <li>
                <h4>Edit | Delete: </h4>

                <div className="owner_edit_delete">
                  <button onClick={updateClickHandler}>
                    Edit <i class="fa fa-edit"></i>
                  </button>
                  <br></br>
                  <br></br>
                  <button onClick={deleteBookHandler}>
                    {" "}
                    Delete <i class="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
      
    </div>
  );
};
export default BookDetails;

<span></span>;
