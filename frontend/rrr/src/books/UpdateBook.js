import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import SuccessModal from "../UIElements/SuccessModal";

import ImageSlider from "../ImageComponents/ImageSlider";

import { AuthContext } from "../context/auth-context";

const UpdateBook = () => {
  const auth = useContext(AuthContext);

  const { bookId } = useParams();

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [slides, setSlides] = useState([]);

  const [form, setForm] = useState({
    bookname: "",
    
    author: "",
    price: "",
   
    description: "",
  
    email: "",
    phone: "",
    images: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`
        );
        const responseData = await response.json();
        console.log("Response >> ", response);
        console.log("ResponseData >> ", responseData);
        console.log("ResponseData book>> ", responseData.data);
        setForm(responseData.data);
        setForm((state) => {
          return { ...state, images: "" };
        });
       
        setSlides(responseData.data.images);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(
          err.message ||
            "Error in UpdateBook Page while fetching book Deatils by id"
        );
        console.log(
          "Error in UpdateBook Page while fetching Book Deatils by id"
        );
      }
    };
    fetchBook();
  }, [bookId]);

  const updateBookHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bookname", form.bookname);
    
    formData.append("author", form.author);
    formData.append("price",form.price);
    
    formData.append("description", form.description);
   
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("creator", auth.userId);

    if (form.images) {
      // which means to update images
      for (const file of form.images) {
        formData.append("images", file);
      }
    }
    try {
      setIsLoading(true);
      console.log("form>>", form);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = await response.json();
      console.log("Response Data : ", responseData);
      if (responseData.status === "error" || responseData.status === "fail") {
        throw new Error(
          responseData.message || "error while updating book by id"
        );
      }
      setIsLoading(false);
      setSuccess(true);
    } catch (err) {
      console.log("Error : ", err);
      setIsLoading(false);
      setError(err.message || "Error While Creating New Book");
    }
  };

  const onFormChangeHandler = (e) => {
    const { value, name, type, files } = e.target;
    setForm((state) => ({
      ...state,
      [name]: type === "file" ? files : value,
    }));
  };

  const errorHandler = () => {
    setError(null);
  };

  const successHandler = () => {
    setSuccess(false);
    navigate("/");
  };

  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <div id="background-update-book">
      <ErrorModal error={error} onClear={errorHandler} />
      <SuccessModal
        success={success}
        successMessage="Listing Details Updated Successfully!"
        onClear={successHandler}
      />
      {isLoading && <LoadingSpinner asOverlay />}

      <div style={{ paddingBottom: "30px" }}>
        <h3>Previously Uploaded Images: </h3>
        <div style={containerStyles}>
          <ImageSlider
            slides={slides}
            prePath={`${process.env.REACT_APP_ASSET_URL}/img/books`}
          />
        </div>
      </div>

      <form
        onSubmit={updateBookHandler}
        id="addnewbook"
        enctype="multipart/form-data"
      >
        <h3 id="head" style={{color:"black"}}>Update Book</h3>
        <div id="Upload">
          <br></br>
          <span id="imgUpload" style={{color:"black"}}>Update images Here :</span>
          <br></br>
          <br></br>
          <input
            type="file"
            className="file"
            accept=".jpg,.png,.jpeg"
            name="images"
            onChange={onFormChangeHandler}
            multiple
          />
          <h5 style={{color:"black"}}>Book Information:</h5>
          <hr style={{ color: "orange" }}></hr>
          <label style={{color:"black"}}>Bookname:</label>
          <br></br>
          <br></br>
          <input
            type="text"
            name="bookname"
            className="inputUpload"
            onChange={onFormChangeHandler}
            placeholder="Enter bookname"
            required
            value={form.bookname}
          />
          <br></br>
          <br></br>
          <div id="flex_div">
          </div> 
          <br></br>
          <br></br>
          <label style={{color:"black"}}>Rent:</label>
          <br></br>
          <br></br>
          <input
            type="number"
            className="inputUpload"
            name="price"
            onChange={onFormChangeHandler}
            placeholder="Enter Rent for Month"
            required
            value={form.price}
          />
          <br></br>
          <label style={{color:"black"}}>Description about your book:</label>
          <br></br>
          <br></br>
          <input
            type="text"
            className="inputUpload"
            name="description"
            onChange={onFormChangeHandler}
            placeholder="Enter Description "
            required
            value={form.description}
          />
          <br></br>
         
          <br></br> 
          <h5 style={{color:"black"}}>Contact:</h5>
          <hr style={{ color: "orange" }}></hr>
          <label style={{color:"black"}}>E-mail:</label>
          <br></br>
          <br></br>
          <input
            type="email"
            className="inputUpload"
            name="email"
            onChange={onFormChangeHandler}
            placeholder="email@email.com"
            required
            value={form.email}
          />
          <br></br>
          <br></br>
          <label style={{color:"black"}}>Phone:</label>
          <br></br>
          <br></br>
          <input
            type="tel"
            className="inputUpload"
            name="phone"
            onChange={onFormChangeHandler}
            placeholder="Enter Phone Number"
            required
            value={form.phone}
          />
          <br></br>
          <br></br>
          <button className="SubmitUpload">Submit</button>
          <br></br>
          <br></br>
        </div>
      </form>
    </div>
  );
};
export default UpdateBook;
