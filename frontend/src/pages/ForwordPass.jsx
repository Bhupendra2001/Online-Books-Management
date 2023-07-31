import React ,{useState} from "react";
import styled from "styled-components";

const Container = styled.div`
  height : 645px;
  top :0px;
 margin : 0px;
 padding : 31px;
`;
const Email = styled.input`
  outline: none;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid gray;
  color: teal;
  margin-top: 10px;
  background-color: transparent;
`;
const Wrapper = styled.div`
border : 1px solid red;
border-radius : 10px;
width : 250px;
height : 160px;
padding : 20px;
margin : auto;
border-radius 
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid gray;
  padding: 10px;
  margin: 20px 0px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 17px;
  color : gray;
  &:hover {
    color: teal;
    border: 1px solid teal;
  }
`;
const Head = styled.span`
  font-size: 20px;
  color : teal;
 
  
`;
const Heading = styled.p`
  text-align: center;
  color : red;
  margin-top : 120px;
`;
const Error = styled.span`
margin : 0px;
`
const Link = styled.a`
text-decoration : none;
color : gray;
`

export const ForwordPass = () => {
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [emailSent, setEmailSent] = useState(false);
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsValidEmail(true);
      };
    
      const handleSendEmail = () => {
        if (!validateEmail(email)) {
          setIsValidEmail(false);
          return;
        }
    // Code to send the email with the reset link goes here.
    // Assuming the email sending is successful, set the emailSent state to true.
    setEmailSent(true);
};
  return (
    <Container>
      <Heading> Online Books Store </Heading>
      <Wrapper>
        <Head>Enter your email that register in your account</Head>
       {!emailSent && <Email type="email" placeholder="Enter Email" value={email} onChange={handleEmailChange} />}
        {!isValidEmail && <Error style={{ color: "red" }}>Please enter a valid email</Error>}

        {!emailSent ? (
          <Button onClick={handleSendEmail}>Send to Email</Button>
        ) : (
          <p style={{ color: "yellow", textAlign: "center" }}>
            Reset link sent to your email.
            <Button><Link href="/"> Back To Home</Link> </Button>
          </p>
        )}
      </Wrapper>
    </Container>
  );
};
