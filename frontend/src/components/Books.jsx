import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { GetBooks } from '../redux/apiCalls'
import { publicRequest, userRequest } from "../requestMethods";
import {   useDispatch } from "react-redux";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  z-index: 0;
`;
const Title = styled.h3`
  color: teal;

  margin: 5px;
`;
const Wrapper = styled.div`
  width: calc(33% - 20px);
  border: 1px solid #fff;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  height: 50%;
`;
const Category = styled.p`
  color: pink;
  margin: 5px;
`;
const Subcategory = styled.span`
  margin: 5px;
`;
const Excerpt = styled.span`
  margin: 5px;
  color: gray;
`;
const ISBN = styled.p`
  margin: 5px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50%;
  margin: 20px;
`;

const Reviews = styled.p`
  margin: 5px;
`;
const IMG = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 10px;
`;
const ImgCont = styled.div``;

const Link = styled.a`
  text-decoration: none;
`;
const ReleasedAt = styled.p`
  color: red;
  margin: 5px;
`;

const Books = ({ title }) => {
  const [books, setBooks] = useState([]);
 
  const dispatch = useDispatch()
  useEffect(() => {
    const getBooks = async () => {
      try {
        let response;
        if (title) {
          response = await publicRequest.get(`/getbooks/${title}`);
        } else {
          response = await publicRequest.get("/getAllbooks");
        }
        
        if (response) {
          setBooks(response.data.data);
          GetBooks(dispatch)
        }
      } catch (err) {
        alert(err.message);
      }
    };
    getBooks();
  }, [title]);

  const createRows = (items, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      const row = items.slice(i, i + itemsPerRow);
      rows.push(row);
    }
    return rows;
  };

  return (
    <Container>
      {createRows(books, 3).map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((item) => (
            <Wrapper key={item._id}>
              <Link href={`/books/${item._id}`}>
                <ImgCont>
                  <IMG src={item.bookCover} />
                </ImgCont>
                <Title> {item.title}</Title>
                <ISBN>{item.ISBN}</ISBN>
                <Excerpt>{item.excerpt}</Excerpt>
                <Reviews>{item.reviews}</Reviews>
                <ReleasedAt>{item.releasedAt}</ReleasedAt>
                <Category>{item.category}</Category>

                <Subcategory>{item.subcategory}</Subcategory>
              </Link>
            </Wrapper>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default Books;
