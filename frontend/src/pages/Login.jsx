import React , { useState}from "react";
import { styled } from "styled-components";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import imge from '../components/book.png'
import {useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/apiCalls'
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: #151628;
  padding: 75px;
  height : 565px;
`;

const Form = styled.form`
  border: 1px solid teal;
  width: 400px;
  height: auto;
  margin: auto;

  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 20px;
`;
const Input = styled.input`
  outline: none;
  background-color: transparent;
  color: teal;
  width: 200px;
  border: none;
`;
const InputContainer = styled.div`
  display: flex;

  border: 1px solid teal;
  border-radius: 10px;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid teal;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 15px;
  cursor : pointer;
  margin: auto;
  &:hover {
    color: teal;
    border: 1px solid #fff;
  }
`;
const ForgetPass = styled.span`
color : #fff;
margin-left : 240px;
`
const Link = styled.a`
text-decoration : none;
cursor : pointer;
color : teal;
`
const Account = styled.span`
color : #fff;
text-align : center;
`

const Title = styled.h2`
text-align : center;
margin : 0px;
color : #fff;
`

const Logo = styled.img`
width : 50px;
height : 50px;
border : 1px solid teal;
border-radius : 50px;
`

const LogoCont = styled.div`
display : flex;
margin-left : 40px;
gap : 50px;
align-items : center;
`
const Error = styled.p`
color : red;
margin : 0px 0px 0px 20px;
font-size :15px;
padding : 0px;
text-align : center;
`
export const Login = () => {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [ error , setError] = useState('')

  const dispatch = useDispatch()
  const { isFetching } = useSelector((state)=> state.user)
  
  const nevigate = useNavigate()

  const handleClick =  (e)=> {
    e.preventDefault()
    login(dispatch , { email , password} , nevigate , setError)
  }
  return (
    <Container>
      <Form>
        <LogoCont>
        <Logo  src={imge} alt=""/>
        <Title> Welcome Back</Title>
        </LogoCont>
        <InputContainer>
          <Input type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
          <HiOutlineMail style={{ color: "teal" }} />
        </InputContainer>
        <InputContainer>
          <Input type="password" placeholder="Enter Password"  onChange={(e)=>setPassword(e.target.value)}/>
          <RiLockPasswordLine style={{ color: "teal" }} />
        </InputContainer>
      { error &&  <Error>{error}</Error>}
       <ForgetPass><Link href="/forgot">Forgot password?</Link></ForgetPass>
        <Button onClick={handleClick} disabled={isFetching}>Login Now</Button>
        <Account>Don't have an account? <Link href="/register"> Sign up</Link></Account>
      </Form>
    </Container>
  );
};
