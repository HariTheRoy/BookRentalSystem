import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AllBooks.css";

import BookList from "./BookList";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const AllBooks = () => {
  const [loadedBooks, setLoadedBooks] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [query, setQuery] = useState();


  useEffect(() => {
    let queryOptions = "";
    
   

    if (query && query.length > 2) {
      queryOptions += `q=${query}`;
    }

    console.log(
      "Query String in Use Effect All Books COmponent >>>",
      queryOptions
    );

    const getBooks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/books/allbooks?${queryOptions}`
        );
        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.status === "fail" || responseData.status === "error") {
          throw new Error(
            responseData.message || "Error While Fetching books Data"
          );
        }
        setLoadedBooks(responseData.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while fetching books data");
        console.log("error while fetching books data");
      }
    };
    getBooks();
  }, [query]);

  const clearError = () => {
    setError(false);
  };
  return (
    <>
      <div id="book_filter">
        <div className="query_div">
          <form>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </form>
        </div>
      </div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div id="book_list_component">
        {!isLoading && loadedBooks && <BookList items={loadedBooks} />}
      </div>
    </>
  );
};

export default AllBooks;
