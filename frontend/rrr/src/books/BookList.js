import React from "react";
import BookCard from "./BookCard";
const BookList = (props) => {
  if (props.items.length === 0) {
    return <h1>No Books !</h1>;
  }
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        margin: "auto",
      }}
    >
      {props.items.map((book) => (
        <BookCard
          key={book._id}
          id={book._id}
          bookname={book.bookname}
          author={book.author}
          price={book.price}
          description={book.description}
         
          email={book.email}
          phone={book.phone}
          images={book.images}
          creator={book.creator}
        />
      ))}
    </ul>
  );
};
export default BookList;
