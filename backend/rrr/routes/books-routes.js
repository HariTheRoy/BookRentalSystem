const express = require("express");

const booksControllers = require("../controllers/books-controllers");

const router = express.Router();

router.post(
  "/addnewbook",
  booksControllers.protect,
  booksControllers.uploadBookImages,
  booksControllers.createBook
);

router.patch(
  "/:bookId",
  booksControllers.protect,
  booksControllers.uploadBookImages,
  booksControllers.updateBookById
);

// router
//   .route("/top-5-cheap")

router.get("/allbooks", booksControllers.getAllBooks);
router.get("/:bookId", booksControllers.getBookById);
router.get("/books/:userId", booksControllers.getBooksByUserId);
router.delete(
  "/:bookId",
  booksControllers.protect,
  booksControllers.deleteBookById
);

module.exports = router;
