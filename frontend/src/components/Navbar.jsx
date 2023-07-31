import React, { useState , useEffect } from "react";
import styled from "styled-components";
import { AiOutlineHome , AiOutlineLogout, AiOutlineLogin , AiOutlineUserAdd} from 'react-icons/ai'
import { MdMiscellaneousServices, MdOutlineCreate} from 'react-icons/md'
import { SiAboutdotme} from 'react-icons/si'

import bookImage from './book.png'
import { logout } from '../redux/apiCalls'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  background-color: #151628;;
  display : flex;
  justify-content : space-between;
  height: 75px;
  align-items : center;
  border-bottom : 1px solid gray;
  padding : 10px 0px 10px 0px;
 
  top : 0px;
  position: fixed;
  width : 100%;
  z-index : 9;
`;
const Left = styled.div`
display : flex;
gap : 20px;
align-items : center;
`;
const Right = styled.div`
display : flex;
gap : 20px;
margin-right : 10px;

`;
const Input = styled.input`
height : 30px;
text-align : center;
outline : none;
 border-radius : 10px;
 border : 1px solid gray;
 background-color: #151628;
 color : #fff;

`;
const Link = styled.a`
text-decoration : none;
color : #fff;
cursor : pointer;
padding : 8px;
border-radius : 50px;
margin : 0px;
 font-size : 25px;
&:hover{
 
  color : blue;
  background-color : yellow;
 
}
`;

const Logo = styled.img`
width : 50px;
height : 50px;
border-radius : 50px;
margin-left : 20px;

`

export const Navbar = ({Set}) => {
  const { currentUser } = useSelector((state)=> state.user)
  const dispatch = useDispatch()
  const nevigate = useNavigate()
  const [current, setCurrent] = useState('home');

  

 
  const handleClick = ()=>{
   
    logout(dispatch , nevigate)
    setCurrent('home');
  }

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.trim();
    Set(searchValue);
  };

  useEffect(()=>{
    const currentPath = window.location.pathname;

    if (currentPath === '/') {
      setCurrent('home');
    } else if (currentPath === '/about') {
      setCurrent('about');
    } else if (currentPath === '/service') {
      setCurrent('service');
    } else if (currentPath === '/addbook') {
      setCurrent('addbook');
    } else if (currentPath === '/login') {
      setCurrent('login');
    } else if (currentPath === '/register') {
      setCurrent('register');
    }
  },[]);

  return (
    <Container>
      <Left>
         <Logo src={bookImage} />
        <Input type="text" placeholder="search books" onChange={handleSearchChange} />
      </Left>
      <Right>
        <Link href="/" style={current === 'home' ? { border: '1px solid yellow', color : "blue" } : {} }><AiOutlineHome/></Link>
        <Link href="/about" style={current === 'about' ? { border: '1px solid yellow' , color : "blue" } : {}}><SiAboutdotme/></Link>
        <Link href="/service" style={current === 'service' ? { border: '1px solid yellow' , color : "blue" } : {}} ><MdMiscellaneousServices/></Link>
        <Link href="/addbook" style={current === 'addbook' ? { border: '1px solid yellow', color : "blue"  } : {}}><MdOutlineCreate/></Link> 
      { !currentUser && <Link href="/login" style={current === 'login' ? { border: '1px solid yellow', color : "blue"  } : {}}><AiOutlineLogin/></Link>}
       { !currentUser && <Link href="/register" style={current === 'register' ? { borderBottom: '1px solid yellow', color : "teal"  } : {}}> <AiOutlineUserAdd/> </Link>}
      { currentUser && <Link > <AiOutlineLogout onClick={handleClick}/></Link>}
      </Right>
    </Container>
  );
};
