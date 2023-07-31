import React from "react";
import { styled } from "styled-components";
import { BsFacebook,  BsGithub, BsLinkedin } from "react-icons/bs";
import {SiLeetcode} from 'react-icons/si'
import { Link } from "react-router-dom"; 

const Container = styled.div`
  padding: 55px 20px 55px 20px;
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  margin-left: 30px;
`;

const Right = styled.div`
  display: flex;
  flex-direction : column;
  margin : 0px;
  padding : 0px;
  margin-right: 30px;
 
  
`;
const Details = styled.p`
font-size : 20px;
color : #fff;
`;
const IconCss = styled.div`
  cursor: pointer;
  background-color: #af33c8;
  padding: 10px;
  color: yellow;
 height : 25px;
  border-radius : 50px;
  &:hover{
    color : blue;
  }
`;

const Icons = styled.div`
display : flex;
margin-top : 150px;
font-size : 25px;
 gap : 15px;
 
`
const Services = styled.div`
`

export const Footer = () => {
  return (
    <Container>
      <Left>
        <Details>My Contact</Details>
        <Details> Email : Bnamdev20@gmail.com </Details>
        <Details> Phone : 7024443376 </Details>
        <Details> City : Jabalpur </Details>
      </Left>
      <Icons>
        <IconCss>
         <Link style={{color : "yellow"}} target="_blank" to={'https://www.facebook.com/login/'}>
         <BsFacebook />
         </Link> 
        </IconCss>

        <IconCss>
          <Link style={{color : "yellow"}} target="_blank" to={'https://leetcode.com/Bhupendra-Namdev/'}  >
          <SiLeetcode />
          </Link>
        </IconCss>

        <IconCss>
          <Link style={{color : "yellow"}} target="_blank"  to={'https://www.linkedin.com/in/bhupendra-namdev-03488a237/'}>
          <BsLinkedin />
          </Link>
        </IconCss>

        <IconCss>
          <Link style={{color : "yellow"}} target="_blank" to={'https://github.com/Bhupendra2001'}>
          <BsGithub />
          </Link>
        </IconCss>
     </Icons>
      <Right>
        <Services>
          <Details>Top Books</Details>
          <Details>Our services</Details>
          <Details>Our Features</Details>
          <Details>About</Details>
        </Services>
      </Right>
    </Container>
  );
};
