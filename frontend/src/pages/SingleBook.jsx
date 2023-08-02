import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { BiUserCircle, BiLike, BiDislike } from "react-icons/bi";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import { incrementLikes, decrementLikes } from "../redux/bookRedux";

import ReviewModal from "../components/ReviewModel";
import axios from "axios";
const Container = styled.div`
  height: auto;

  flex-wrap: wrap;
  z-index: 0;
  padding-top: 130px;
`;
const Title = styled.h3`
  color: teal;
`;
const Wrapper = styled.div`
  width: 80%;
  border: 1px solid #fff;
  padding: 20px;
  border-radius: 10px;
  margin: 40px 40px 40px 60px;
  display: ${(props)=> props.fetching == 'true' ? "none" : "flex"};
`;
const Category = styled.p`
  color: pink;
`;
const Subcategory = styled.span`
  color: #fff;
`;
const Excerpt = styled.span`
  color: gray;
`;
const ISBN = styled.p``;

const Reviews = styled.p`
  color: gray;
`;
const ReleasedAt = styled.p`
  color: red;
`;
const Break = styled.br``;
const Button = styled.button`
  margin: 20px 20px 20px 1px;
  background-color: transparent;
  border: 1px solid red;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
`;
const Img = styled.img`
  width: 90%;
  height: 90%;
  margin: 20px;
  border-radius: 20px;
`;
const ImgCont = styled.div``;
const Like = styled.span`
  text-align: center;
  &:hover {
    color: yellow;
  }
`;
const LikeButton = styled.div`
  display: flex;
  gap: 20px;
  margin: 5px;
  color: gray;
  cursor: pointer;
`;

const Rate = styled.div`
  color: blue;
  text-align: center;
  cursor: pointer;
  border: 1px solid red;
  border-radius: 4px;
  padding: 10px;
  width: 200px;
  margin: auto;
`;

const DetailCont = styled.div``;
const ReviewCont = styled.div``;
const ReviewWrapper = styled.div``;

const Review = styled.p`
  color: yellow;
  margin: 5px;
  padding: 10px 10px 10px 0px;
`;
const Ratings = styled.h2`
  color: yellow;
  margin: 0px;
`;
const ReviewerName = styled.h4`
  color: green;
  margin: 0px;
`;
const Time = styled.span`
  color: pink;
  margin: 7px;
`;
const Details = styled.div`
  border: 1px solid #fff;
  margin: 20px 20px 20px 60px;
  width: 300px;
  border-radius: 15px;
  padding: 20px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
function timeAgo(timestamp) {
  const currentDate = new Date();
  const pastDate = new Date(timestamp);
  const timeDifference = Math.abs(currentDate - pastDate);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 12 * month;

  if (timeDifference < minute) {
    return "Just now";
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (timeDifference < month) {
    const daysAgo = Math.floor(timeDifference / day);
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  } else if (timeDifference < year) {
    const monthsAgo = Math.floor(timeDifference / month);
    return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifference / year);
    return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
  }
}

export const SingleBook = () => {
  const [likes, setLikes] = useState(0);
  const [dislike, setDislikes] = useState(0);
  const [fetching , setFeching] = useState(true)

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const [reviewedBy, setReviewedBy] = useState(currentUser?.username);
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async (e) => {
      try {
        const res = await axios.get("https://books-management-nine.vercel.app/api/getReviews", {
          headers: { "x-api-key": currentUser?.token },
        });
        if (res) {
          setReviews(res.data);
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    };
    getReviews();
  }, []);

  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const handleReviewModalOpen = () => {
    setReviewModalOpen(true);
  };

  const handleReviewModalClose = () => {
    setReviewModalOpen(false);
  };

  const handleSubmitReview = async (reviewData) => {
    const { rating, comments } = reviewData;
    try {
      const review = comments;

      const response = await axios.post(
        `https://books-management-nine.vercel.app/api/books/${bookId}/reviews`,
        { reviewedBy, rating, review },
        {
          headers: { "x-api-key": currentUser?.token },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const nevigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      setFeching(true)
      try {
        const response = await axios.get(`https://books-management-nine.vercel.app/api/books/${bookId}`, {
          headers: { "x-api-key": currentUser?.token },
        });
        if (response) {
          setBook(response.data.data);
          setFeching(false)
          setLikes(response.data.data.likes);
          setDislikes(response.data.data.dislike);
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    };
    getBooks();
  }, []);

  const tostring = (input)=>  {
    let data = input

    const formattedDate =  new Date(data).toString().slice(0, 15)
    return formattedDate
  }

  const handleDelete = async (e) => {
    try {
      const response = await axios.delete(`https://books-management-nine.vercel.app/api/books/${bookId}`, {
        headers: { "x-api-key": currentUser?.token },
      });
      alert(response.data.message);
      nevigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleUpdate = (e) => {
    nevigate(`/update/${bookId}`);
  };

  const handleLike = async () => {
    // Replace 'bookId' with the actual ID of the book you want to like
    dispatch(incrementLikes(bookId));
    try {
      let res = await axios.put(`https://books-management-nine.vercel.app/api/likes/like/${bookId}`);

      setLikes(res.data.likes);
    } catch (err) {}
  };

  const handleDislike = async () => {
    // Replace 'bookId' with the actual ID of the book you want to dislike
    dispatch(decrementLikes(bookId));
    try {
      let res = await axios.put(`https://books-management-nine.vercel.app/api/likes/dislike/${bookId}`);
   
      setDislikes(res.data.dislike);
    } catch (err) {}
  };

  return (
    <Container>
      <Navbar />
      {
        <Wrapper fetching={fetching.toString()}>
          <ImgCont>
            <Img src={book?.bookCover} />
          </ImgCont>

          <DetailCont>
            <Title>Title : {book.title}</Title>
            <ISBN> {book.ISBN}</ISBN>
            <Excerpt>Excerpt : {book.excerpt}</Excerpt>
            <Reviews> Reviews : {book.reviews}</Reviews>
            <ReleasedAt> ReleasedAt : {tostring(book.releasedAt)}</ReleasedAt>
            <Category> Category : {book.category}</Category>

            <Subcategory> Subcategory :{book.subcategory}</Subcategory>
            <Break />
            {currentUser?.userId === book.userId && (
              <Button onClick={handleDelete}>
                <AiFillDelete style={{ color: "red" }} />
              </Button>
            )}
            {currentUser?.userId === book.userId && (
              <Button onClick={handleUpdate}>
                <RxUpdate style={{ color: "yellow" }} />
              </Button>
            )}
            <Break />
          </DetailCont>
        </Wrapper>
      }
      <Rate onClick={handleReviewModalOpen}>Give Your Rating</Rate>
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleReviewModalClose}
        onSubmitReview={handleSubmitReview}
      />

      <ReviewCont>
        {reviews.map((item) => (
          <ReviewWrapper key={item._id}>
            {item.bookId === bookId && (
              <Details>
                <User>
                  <BiUserCircle
                    style={{
                      color: "blueviolet",
                      fontSize: "30px",
                      padding: "0px",
                      margin: "0px",
                    }}
                  />
                  <ReviewerName>@{item.reviewedBy}</ReviewerName>
                </User>

                <Rating
                  value={item.rating}
                  readOnly
                  style={{ margin: "10px 5px 5px 1px" }}
                />
                <Review>{item.review}</Review>
                <Time>{timeAgo(item.reviewedAt)}</Time>
                <LikeButton>
                  <Like>
                    <BiLike onClick={handleLike} />
                  </Like>
                  {likes}
                  <Like>
                    <BiDislike onClick={handleDislike} />
                  </Like>
                  {dislike}
                </LikeButton>
              </Details>
            )}
          </ReviewWrapper>
        ))}
      </ReviewCont>

      <Footer />
    </Container>
  );
};
