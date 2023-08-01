import React, { useState } from "react";
import { styled } from "styled-components";
import { ImHappy } from "react-icons/Im";
import { GiLotusFlower } from "react-icons/gi";
import { useSelector } from "react-redux";
import axios from "axios";
const Container = styled.div`
  background-color: #70d7f1;
  height: 110px;
  padding: 30px 10px 20px 10px;
  border-radius: 0px 200px 0px 200px;
  text-align: center;
  margin: 100px 100px 50px 100px;
`;
const Input = styled.input`
  height: 30px;
  text-align: center;
  outline: none;
  border-radius: 10px;
  border: 1px solid #fff;
  background-color: transparent;
  color: teal;
`;
const Button = styled.button`
  padding: 8px;
  border-radius: 10px;
  margin-left: 40px;
  background-color: transparent;
  color: #fff;
  border: 1px solid #fff;
  cursor: pointer;
  &:hover {
    border: 1px solid red;
    color: red;
  }
`;
const Title = styled.h4`
  color: #cf26f1;
  font-size: 15px;
`;
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { currentUser} = useSelector((state)=> state.user)
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = async () => {
    // Simple email validation using regular expression

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(emailPattern)) {

      try{
        const res = await axios.post(`https://books-management-nine.vercel.app/api/Email/${email}` , {
          headers : {"x-api-key"  : currentUser?.token}
        })
        if(res){
          setSubscribed(true);
        }

      }catch(err){
        alert(err.response.data.message)
      }
    } else {
      alert("Please enter a valid email address.");
    }


  };


  return (
    <Container>
      {!subscribed ? (
        <>
          <Title>
            For the latest books subscribe to my website and get the latest
            update.
          </Title>
          <Input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={handleEmailChange}
          />
          <Button onClick={handleSubscribe}>Subscribe Now</Button>
        </>
      ) : (
        <div>
          <Title>Thank you for subscribing!</Title>
          <GiLotusFlower style={{ color: "yellowgreen" }} />{" "}
          <ImHappy style={{ color: "yellow" }} />{" "}
          <GiLotusFlower style={{ color: "yellowgreen" }} />
        </div>
      )}
    </Container>
  );
};

export default Newsletter;
