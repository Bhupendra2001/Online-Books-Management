const validation = require("../validation/validation");
const userModels = require("../models/userModel");
const bookModels = require("../models/bookModel");
const reviewModels = require("../models/reviewModel");

const { uploadFile } = require("./aws");
const { dad, isvalidObjectid, validISBN, validName, validDate, isValidImg } =
  validation;

const createBook = async (req, res) => {
  try {
    const data = req.body;
    const CoverPic = req.files;

    if (!CoverPic[0])
      return res
        .status(400)
        .send({ status: false, message: "please provide CoverPic" });
    if (!isValidImg(CoverPic[0].originalname)) {
      return res
        .status(400)
        .send({ status: false, message: "Image Should be of JPEG/ JPG/ PNG" });
    }
    data["bookCover"] = await uploadFile(CoverPic[0]);

    const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } =
      data;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "Are ! All fields is mandatory" });

    if (!title)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... title is mandatory" });
    if (!excerpt)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... excerpt is mandatory" });
    if (!userId)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... userId is mandatory" });
    if (!ISBN)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... ISBN is mandatory" });
    if (!category)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... category is mandatory" });
    if (!subcategory)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... subcategory is mandatory" });
    if (!releasedAt)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... releasedAt is mandatory" });

    if (!validName(excerpt))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid excerpt" });

    if (!isvalidObjectid(userId))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid userId" });

    if (!validISBN(ISBN)) {
      return res.status(400).send({
        status: false,
        message: "Oooh... please provide a valid ISBN",
      });
    }

    if (!validName(category))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid category" });

    if (!validName(subcategory))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid subcategory" });

    if (!validDate(releasedAt))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid releasedAt" });

    const userID = await userModels.findOne({ _id: userId });
    if (!userID)
      return res.status(404).send({
        status: false,
        message: "Oooh... user is not present in data",
      });

    const uniqeTitle = await bookModels.findOne({ title });
    if (uniqeTitle)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... title should be unique" });
    const uniqeISBN = await bookModels.findOne({ ISBN });
    if (uniqeISBN)
      return res
        .status(400)
        .send({ status: false, message: "Oooh... ISBN should be unique" });

    const savaData = await bookModels.create(data);
    return res
      .status(201)
      .send({ status: true, message: "successfully created ", savaData });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: err.message, message: "server error" });
  }
};

const getAllbooks = async (req, res) => {
  try {
    const data = await bookModels.find().sort({ title: 1 });
    return res.status(201).send({ data: data });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: err.message, message: "server error" });
  }
};
const getbooks = async (req, res) => {
  try {
    let title = req.params.title;

    const searchRegex = new RegExp(title, "i");
    const data = await bookModels
      .find({ title: searchRegex })
      .sort({ title: 1 });

    return res
      .status(200)
      .send({ status: true, message: "Books list", data: data });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: err.message, msg: "server error" });
  }
};

const Likes = async (req, res) => {
  try {

    const value = req.params.value;
    const bookId = req.params.bookId;
    
    let data ;
    if (value === "like") {
     data =  await bookModels.findByIdAndUpdate(bookId, {$inc : { likes : 1}} , { new : true})
    } else {
     data =  await bookModels.findByIdAndUpdate(bookId,{$inc : { dislike : 1 }}, { new : true} )
    }
  
    return res.status(200).send(data)
  } catch (error) {
    return res
    .status(500)
    .send({ status: false, message: error.message, msg: "server error" });

  }
};


const getbook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    if (!isvalidObjectid(bookId))
      return res
        .status(400)
        .send({ status: false, message: "Oooh... invalid bookId" });

    const Bookdata = await bookModels
      .findOne({ _id: bookId, isDeleted: false })
      .select({ ISBN: 0, __v: 0 });
    if (!Bookdata)
      return res
        .status(404)
        .send({ status: false, message: "Oooh... books is not found" });

    let review = await reviewModels
      .find({ bookId: bookId, isDeleted: false })
      .select({ isDeleted: 0 });

    let data1 = {
      status: true,
      msg: "Book List",
      data: Bookdata,
      reviewData: review,
    };

    return res.status(200).send({ ...data1 });
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: err.message, msg: "server error" });
  }
};

const updateBooks = async function (req, res) {
  try {
    let data = req.body;
    let bookId = req.params.bookId;
    const CoverPic = req.files;

    if (CoverPic[0]) {
      if (!isValidImg(CoverPic[0].originalname)) {
        return res.status(400).send({
          status: false,
          message: "Image Should be of JPEG/ JPG/ PNG",
        });
      }
      data["bookCover"] = await uploadFile(CoverPic[0]);
    }

    if (Object.keys(data).length == 0)
      return res.status(400).send({
        status: false,
        msg: "Areee... body should contain any title,excerpt,ISBN,releasedAt",
      });
    if (data.ISBN) {
      if (!validISBN(data.ISBN)) {
        return res
          .status(400)
          .send({ status: false, msg: "Oooo...  please provide a valid ISBN" });
      }
    }
    if (!dad(data.releasedAt)) {
      return res.send({ msg: "release date wrong" });
    }
    if (data.releasedAt) {
      if (!validDate(data.releasedAt))
        return res.status(400).send({
          status: false,
          message: "Oooo... Date should be in (YYYY-MM-DD) format",
        });
    }

    let validBookId = await bookModels.findOne({ _id: bookId });
    if (
      validBookId.title == data.title ||
      validBookId.ISBN == data.ISBN ||
      validBookId.excerpt == data.excerpt ||
      validBookId.releasedAt == data.releasedAt
    )
      return res.status(400).send({
        status: false,
        msg: "Oooo... title or ISBN or releasedAt or excerpt are Already present",
      });

    let valid = await bookModels.findOne({
      $or: [{ title: data.title }, { ISBN: data.ISBN }],
    });
    if (valid) {
      return res.status(400).send({
        status: false,
        message: "Oooo... title and ISBN should be unique",
      });
    }

    let UpdateABook = await bookModels.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      {
        $set: {
          title: data.title,
          excerpt: data.excerpt,
          ISBN: data.ISBN,
          releasedAt: data.releasedAt,
          updatedAt: Date.now(),
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "Success", data: UpdateABook });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, msg: error.message, message: "server error" });
  }
};

const bookDelete = async (req, res) => {
  try {
    let bookId = req.params.bookId;

    await bookModels.findByIdAndDelete({ _id: bookId });

    await reviewModels.deleteMany({ bookId });
    return res
      .status(200)
      .send({ status: true, message: "Book Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: error.message, msg: "server error" });
  }
};

module.exports = {
  getbooks,
  createBook,
  getbook,
  updateBooks,
  bookDelete,
  getAllbooks,
  Likes
};
