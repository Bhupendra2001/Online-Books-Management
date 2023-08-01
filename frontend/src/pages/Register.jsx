import React, { useState } from "react";
import { styled } from "styled-components";
import img_logo from "./Register.png";
import axios from "axios";
const Container = styled.div`
  background-color: #151628;

  height: 700px;
  display: flex;
  gap: 10px;
  margin-bottom: 0px;
  padding-bottom: 10px;
`;
const Input = styled.input`
  outline: none;
  background-color: transparent;
  color: teal;
  width: 280px;
  border: none;
`;
const Form = styled.form`
  border: 1px solid teal;
  width: 400px;
  height: 600px;
  margin: auto;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 20px;
`;
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
`;
const Account = styled.span`
  color: #fff;
  text-align: center;
`;
const Title = styled.h3`
  margin: 0;
  color: #fff;
  text-align: center;
`;
const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: teal;
`;
const InputContainer = styled.div`
  display: flex;

  border: 1px solid teal;
  border-radius: 10px;
  justify-content: space-between;
  padding: 5px;
  margin: 0px;
`;
const Select = styled.select`
  background-color: transparent;
  color: #fff;
  border: none;
`;
const Option = styled.option`
  background-color: teal;
`;
const LogoCont = styled.div`
  width: 50%;
  height: 85%;
  margin: 50px 50px 10px 10px;
  background-color: teal;
  border-radius: 40px 200px 40px 200px;
  padding: 20px;
`;
const Img = styled.img`
  width: 80%;
  margin: 100px 10px 10px 10%;
  border-radius: 40px;
`;

export const Register = () => {
  const [inputs, setInputs] = useState({
    title: "Mr",
    name: "",
    phone: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      pincode: "",
    },
  });

  const handleChange = (e) => {
    if (e.target.name.startsWith("address.")) {
      // Handle address fields separately
      const addressField = e.target.name.split(".")[1];
      setInputs({
        ...inputs,
        address: {
          ...inputs.address,
          [addressField]: e.target.value,
        },
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://books-management-nine.vercel.app/api/register", inputs);
      if (res) {
        alert("Register successfully");
        console.log(res.data);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  
  return (
    <Container>
      <LogoCont>
        <Img src={img_logo} />
      </LogoCont>
      <Form onSubmit={handleSubmit}>
        <Title>Create Your Account</Title>
        <InputContainer>
          <Select name="title" onChange={handleChange}>
            <Option value={"Mr"}>Mr</Option>
            <Option value={"Mrs"}>Mrs</Option>
            <Option value={"Miss"}>Miss</Option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Username"
            name="name"
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="number"
            placeholder="Phone number"
            name="phone"
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="text"
            placeholder="Create password"
            name="password"
            onChange={handleChange}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="text"
            placeholder="Enter street"
            name="address.street"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Enter city"
            name="address.city"
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="number"
            placeholder="Enter pincode"
            name="address.pincode"
            onChange={handleChange}
          />
        </InputContainer>

        <Button>Register Now</Button>
        <Account>
          If Already have account, <Link href="/login">Login</Link>
        </Account>
      </Form>
    </Container>
  );
};
