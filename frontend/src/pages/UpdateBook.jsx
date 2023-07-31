import React, { useState } from "react";
import { styled } from "styled-components";
import { userRequest } from "../requestMethods";
import { useParams} from 'react-router-dom'
import {  useSelector } from "react-redux";
import { Navbar} from '../components/Navbar'
import { Footer} from '../components/Footer'
const Container = styled.div`
background-color: #151628;

height: 850px;


padding-top: 150px;
`
const Form = styled.form`
border: 1px solid teal;
width: 400px;
height: 500px;
margin: auto;

display: flex;
flex-direction: column;
gap: 20px;
padding: 20px;
border-radius: 20px;
`
const Input = styled.input`
outline: none;
  background-color: transparent;
  color: teal;
  width: 280px;
  border: none;
  `
const Button = styled.button`
background-color: transparent;
  border: 1px solid teal;
  padding: 7px;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  margin: 1px;
  &:hover {
    color: darkgreen;
    border: 1px solid darkgreen;
  }
  `
const InputContainer = styled.div`
display: flex;

border: 1px solid teal;
border-radius: 10px;
justify-content: space-between;
padding: 5px;
margin: 0px;

`
const Error = styled.span``
const Heading = styled.h3`
color: #fff;
text-align : center;
margin: 0px;

`

export const UpdateBook = () => {


    const { bookId } = useParams()
    const { currentUser } = useSelector((state)=> state.user)
    const [ bookCover , setBookCover] = useState(null)
    const [inputs, setInputs] = useState({
        title: "",
        excerpt: "",
        userId: currentUser?.userId,
        ISBN: "",
        category: "",
        subcategory: "",
        
      });

      const handleChange = (e) => {
        setInputs({
          ...inputs,
          [e.target.name]: e.target.value,
        });
    
        if (e.target.type === "file") {
          const file = e.target.files[0];
          setInputs({
            ...inputs,
            bookCover: file,
          });
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const formData = new FormData();
      formData.append('bookCover', bookCover);
      Object.keys(inputs).forEach((key) => {
        formData.append(key, inputs[key]);
      });
          const res = await userRequest.put(`/books/${bookId}`, formData ,{
            headers: {
              'Content-Type': 'multipart/form-data', 
              "x-api-key"  : currentUser?.token
            },
          });
          if (res) {
            alert("books updated successfully");
            
          }
        } catch (err) {
          alert(err.response.data.message);
        }
      };

  return (
    <Container>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <Heading>Update book</Heading>
        <InputContainer>
          <Input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="text"
            placeholder="excerpt"
            name="excerpt"
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="number"
            placeholder="ISBN"
            name="ISBN"
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="text"
            placeholder="category"
            name="category"
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="text"
            placeholder="subcategory"
            name="subcategory"
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="date"
            placeholder="releasedAt"
            name="releasedAt"
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <Input type="file" placeholder="bookCover" onChange={(e)=>setBookCover(e.target.files[0])}  />
        </InputContainer>

        <Button type="submit">Update Book Now</Button>
      </Form>
      <Footer/>
    </Container>
  )
}
