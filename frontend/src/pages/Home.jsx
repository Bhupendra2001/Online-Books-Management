import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import Newsletter from "../components/Newsletter";

import { Footer } from "../components/Footer";
import { styled } from "styled-components";
import Books from "../components/Books";

const Container = styled.div`
  left: 0px;
  top: 0px;
  margin: 0px;
  color: #fff;
  height: auto;
  padding-bottom: 20px;
  padding-top: 130px;
`;
const Home = () => {
  const [title , setTitle] = useState('')
  return (
    <Container>
      <Navbar Set={setTitle} />
      <Books title={title} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Home;
