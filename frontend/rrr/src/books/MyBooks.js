import { useState, useEffect, useContext } from "react";

import "./MyBooks.css";
import BookCard from "./BookCard";
import BookList from "./BookList";
import { AuthContext } from "../context/auth-context";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const MyBooks = () => {
  const auth = useContext(AuthContext);

  const [loadedBooks, setLoadedBooks] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/books/books/${auth.userId}`
        );
        const responseData = await response.json();
        console.log("loadedBooks >> ", responseData.data.books);
        setLoadedBooks(responseData.data.books);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while getting books by user id");
        console.log("Error while retrieving");
      }
    };
    getBooks();
  }, [auth.userId]);

  const clearError = () => {
    setError(false);
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}></div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedBooks && <BookList items={loadedBooks} />}
    </>
  );
};

export default MyBooks;
