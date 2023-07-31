const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");

const { validRating, validName } = require("../validation/validation");

const createReview = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    if (!bookId)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... bookID should be present" });
    if (!mongoose.isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid bookId" });

    let bookByBookId = await bookModel.findById(bookId);
    if (!bookByBookId)
      return res
        .status(404)
        .send({ status: false, message: "Oooh... Book not found" });
    if (bookByBookId.isDeleted)
      return res
        .status(404)
        .send({ status: false, message: "Oooh... Book is already deleted" });

    let data = req.body;

    if (Object.keys(data).length == 0 || Object.keys(data).length > 4)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... req body is empty" });

    let { reviewedBy, rating, review } = data;

    if (!rating)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... rating is required" });

    if (!validName(reviewedBy))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid name" });
    if (!validRating(rating))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid Rating" });
    if (!validName(review))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid review" });

    let creatData = {
      bookId: bookId,
      reviewedBy: reviewedBy,
      reviewedAt: Date.now(),
      rating: rating,
      review: review,
    };

    const bookdata = await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $inc: { reviews: 1 } }
    );
    if (bookdata.isDeleted)
      return res
        .status(400)
        .send({ status: false, message: "book is already deleted" });

    let saveddata = await reviewModel.create(creatData);
    let r = saveddata.toObject();
    let data2 = {
      ...bookdata._doc,
      reviewData: [
        {
          _id: r._id,
          bookId: r.bookId,
          reviewedBy: r.reviewedBy,
          reviewedAt: r.reviewedAt,
          rating: r.rating,
          review: r.review,
        },
      ],
    };

    return res
      .status(201)
      .send({
        status: true,
        message: "review added successfully",
        Data: data2,
      });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, message: err.message, msg: "server error" });
  }
};



const getAllreview = async (req, res) => {
  try {
    const data = await reviewModel.find({}).sort({ review: 1 });

    return res.status(200).send(data);
  } catch (err) {
    res
      .status(500)
      .send({ status: false, message: err.message, msg: "server error" });
  }
};

const updateReview = async (req, res) => {
  try {
    let bookId = req.params.bookId;
    let reviewId = req.params.reviewId;
    let body = req.body;
    let bodydata = Object.keys(body);

    if (
      bookId == undefined ||
      reviewId == undefined ||
      Object.keys(body).length == 0 ||
      Object.keys(body).length > 3
    )
      return res
        .status(400)
        .send({ status: false, message: "Oooh Something is missing" });
    if (!["reviewedBy", "rating", "review"].includes(...bodydata))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... request body is wrong" });

    if (
      !mongoose.isValidObjectId(bookId) ||
      !mongoose.isValidObjectId(reviewId)
    )
      return res
        .status(400)
        .send({
          status: false,
          message: "Oooh... bookId or reviewId are wrong",
        });

    let book = await bookModel.findOne({ _id: bookId });
    if (!book || book.isDeleted) {
      return res
        .status(400)
        .send({ status: false, message: "Oooh... Book is not present" });
    }
    let review = await reviewModel.findOne({ _id: reviewId, isDeleted: false });
    if (!review) {
      return res.status(400).send({
        status: false,
        message: "Oooh... review is not present or Deleted",
      });
    }
    if (review.bookId != bookId)
      return res.status(401).send({
        status: false,
        message: "Oooh... bookId is not maching from reviewid`s book Id",
      });

    let updateReview = await reviewModel.findOneAndUpdate(
      { _id: review },
      {
        $set: {
          reviewedBy: body.reviewedBy,
          rating: body.rating,
          review: body.review,
          reviewedAt: Date.now(),
        },
      },
      { new: true }
    );
    let daaaadaaji = book.toObject();
    let r = updateReview.toObject();

    let ra = {
      ...daaaadaaji,
      reviewData: [
        {
          _id: r._id,
          bookId: r.bookId,
          reviewedBy: r.reviewedBy,
          reviewedAt: r.reviewedAt,
          rating: r.rating,
          review: r.review,
        },
      ],
    };
    return res.status(200).send({
      status: true,
      message: "review data updated successfully",
      Data: ra,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: err.message, msg: "server error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const reviewId = req.params.reviewId;

    if (!bookId)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... bookID should be present" });
    if (!reviewId)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... reviewId should be present" });
    if (!mongoose.isValidObjectId(bookId))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid bookId" });
    if (!mongoose.isValidObjectId(reviewId))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid reviewId" });

    let books_find = await bookModel.findById(bookId);
    if (!books_find || books_find.isDeleted)
      return res
        .status(404)
        .send({ status: false, message: "Oooh... Book not found" });
    let review_find = await reviewModel.findById(reviewId);
    if (!review_find || review_find.isDeleted)
      return res.status(404).send({
        status: false,
        message: "Oooh... Review not found or Riview is Deleted",
      });

    if (review_find.bookId != bookId)
      return res.status(401).send({
        status: false,
        msg: "Oooh... bookId is not maching from books",
      });

    const review = await reviewModel.findOneAndUpdate(
      { _id: reviewId },
      { $set: { isDeleted: true } },
      { new: true }
    );

    await bookModel.findOneAndUpdate(
      { _id: bookId },
      { $inc: { reviews: -1 } }
    );

    return res
      .status(200)
      .send({ status: true, isDeleted: true, data: review });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: err.message, msg: "server error" });
  }
};

module.exports = { createReview, updateReview, deleteReview  , getAllreview};
