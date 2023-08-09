const mongoose = require("mongoose");
const multer = require("multer");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Book = require("../models/book");
const User = require("../models/user");
const AppError = require("../utils/appError");
const { fstat } = require("fs");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/books");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `book-${Date.now()}.${ext}`);
  },
});

// const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please Upload Image Only!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadBookImages = upload.array("images"); // it will automatically adds  req.files

const createBook = async (req, res, next) => {
  let imageFileNames = [];
  req.files.forEach((obj) => {
    imageFileNames.push(obj.filename);
  });

  let createdBook = new Book({
    bookname: req.body.bookname,
    
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
   
    email: req.body.email,
    phone: req.body.phone,
    creator: req.user._id,
    images: imageFileNames,
  });

  try {
    console.log("req.user>>>",req.user);
    console.log("createdBook >> ",createdBook)
    await createdBook.save();
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { books: createdBook } }
    );
  } catch (err) {
    console.log(err.message)
    return next(
      new Error("Error While Inserting Created Book Id in Users Book Array!")
    );
  }

  res.json({
    status: "success",
    data: {
      createdBook,
    },
  });
};

const updateBookById = async (req, res, next) => {

  const to_update = {
    //my code
    bookname: req.body.bookname,
    
    author: req.body.author,
    price: req.body.price,
    description: req.body.description,
    
    email: req.body.email,
    phone: req.body.phone,
    creator: req.user._id,
  };

  let imageFileNames = [];
  req.files.forEach((obj) => {
    imageFileNames.push(obj.filename);
  });
  if (imageFileNames.length === 0) {
    // delete
    console.log("zero images");
  } else {
    console.log("non zero images");
    to_update.images = imageFileNames;
  }

  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, to_update, {
      new: true, // to return newly updated document to client
      runValidators: true,
    });

    if (!book) {
      return next(new AppError("No book Found with given ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


const getAllBooks = async (req, res, next) => {
  try {

    let query = Book.find();
    // console.log("books >>",books);
    
    let books = await query; 
    if(req.query.q){
      const {q} =req.query;
      console.log("q>>>",q);
      const keys=[
        "bookname",
        "author",
        "description",

      ];
      const search =  (data) => {
        return data.filter((item) => 
        keys.some((key)=> item[key].toLowerCase().includes(q))

        );
      };
      books = search(books);
    }


    res.json({
      status: "success",
      data: books,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId);
    console.log(book, req.params.bookId);

    if (!book) {
      return next(new AppError("No book Found with given ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getBooksByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let books;
  try {
    books = await User.findById(userId).populate("books");
    console.log(books);
    res.json({
      status: "success",
      data: books,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteBookById = async (req, res, next) => {
  let bookToDelete;
  try {
    bookToDelete = await Book.findById(req.params.bookId);
  } catch (err) {
    return next(new AppError("No book Found with given ID", 404));
  }

  console.log("book To Delete >>> ", bookToDelete);
  let book;
  try {
    book = await Book.findByIdAndDelete(req.params.bookId);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message || "Error While Deleting book",
    });
  }

  try {
    await User.findOneAndUpdate(
      { _id: bookToDelete.creator },
      { $pull: { books: bookToDelete._id } }
    );
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message || "Error While poppig book id from user document",
    });
  }

  // deleting uploaded room Images
  if (process.env.BOOK_IMG_FILE_PATH) {
    for (let img_file of bookToDelete.images) {
      fs.unlink(`${process.env.BOOK_IMG_FILE_PATH}${img_file}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } else {
    console.log("Please Configure Path to files in env");
  }

  res.json({
    status: "success",
    data: book,
  });
};

const protect = async (req, res, next) => {
  //1)Getting Token
  // console.log(req.headers);
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Your are not Logged In!", 401));
  }
  //2)Verification

  let decoded = "";
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
  } catch (err) {
    return next(new AppError("Invalid JWT Token! Please Login Again!", 401));
  }
  //3)Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  //4) Check if user changed password after token was issued
  // if password is changed recently throw error

  // grant access
  req.user = freshUser;
  next();
};


exports.uploadBookImages = uploadBookImages;
exports.createBook = createBook;
exports.updateBookById = updateBookById;
exports.deleteBookById = deleteBookById;
exports.protect = protect;

exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.getBooksByUserId = getBooksByUserId;
