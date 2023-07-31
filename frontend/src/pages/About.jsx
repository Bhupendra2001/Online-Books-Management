import React from 'react'
import { styled } from 'styled-components'
import { Navbar } from '../components/Navbar'
const Container = styled.div`
 padding-top : 80px;
`
const Wrapper = styled.div`
padding : 30px;`

const AboutContent = styled.p`
color : blue;
background-color : yellow;
font-size : 30px;

padding : 35px;
border-radius : 20px;
`
const Heading = styled.h2`
color : #fff;
text-align : center;
`
const Subheading = styled.h3`
color : teal;`
const Model = styled.p`
color : gray;
background-color : darkgreen;
padding : 50px;
border-radius : 20px;
`
const Points = styled.p`
color : #be5cf4;
background-color : #07031b;;
border-radius : 20px;
padding : 40px;
`

export const About = () => {
  return (
    <Container>
        <Navbar/>
      <Wrapper>

        <Heading>Books Management Project</Heading>
        <AboutContent>
        Lithium is a cutting-edge Books Management project designed to efficiently manage and organize a diverse collection of books. With a focus on collaboration and streamlined database management, Lithium aims to simplify the process of book cataloging, user interactions, and book reviews.
        </AboutContent>
        <Heading> Key Points</Heading>
        <Points>Lithium employs a centralized group database named groupXDatabase. To ensure a cohesive workflow, the team cleans the database used previously and repurposes it for this project</Points>
        <Points>Each group will have a single git branch for code coordination. Team members will coordinate amongst themselves, pulling the code last pushed by a teammate. The branch's naming convention should be project/booksManagementGroupX</Points>
        <Points>Following the provided instructions, it is crucial for all team members to adhere to the naming conventions precisely.</Points>


        <Heading>Models</Heading>
         
        <Model>Lithium incorporates three essential models to manage user data, book data, and book reviews effectively:</Model>

       <Subheading> (1) User Model</Subheading>

       <Model>The User Model represents users interacting with the Books Management system. It includes the following fields:

title: A mandatory field allowing enumeration of titles (e.g., Mr, Mrs, Miss) for user identification.
name: A mandatory field capturing the user's name.
phone: A mandatory and unique field to store the user's phone number.
email: A mandatory and unique field to store the user's valid email address.
password: A mandatory field with a minimum length of 8 characters and a maximum length of 15 characters, used for user authentication.
address: An object containing the user's address details, including street, city, and pin code.</Model>

<Subheading>(2) Books Model</Subheading>
 <Model>The Books Model represents individual books within the system and contains the following fields:

title: A mandatory and unique field denoting the title of the book.
excerpt: A mandatory field providing a brief excerpt or summary of the book.
userId: A mandatory field referring to the ObjectId of the user who added the book, linking to the User Model.
ISBN: A mandatory and unique field representing the International Standard Book Number of the book.
category: A mandatory field indicating the main category of the book.
subcategory: A mandatory array field containing additional subcategories related to the book.
reviews: A field with a default value of 0, indicating the number of reviews the book has received.
deletedAt: A Date field indicating when the document is deleted (if applicable).
isDeleted: A boolean field with a default value of false, indicating whether the book is deleted or not.
releasedAt: A mandatory Date field with the format "YYYY-MM-DD," representing the book's release date.</Model>

<Subheading>(3) Review Model</Subheading>
<Model>The Review Model allows users to provide reviews and ratings for books in the system. It consists of the following fields:

bookId: A mandatory field referring to the ObjectId of the reviewed book, linking to the Books Model.
reviewedBy: A mandatory field indicating the name of the reviewer. The default value is 'Guest' for anonymous reviews.
reviewedAt: A mandatory Date field indicating the date of the review.
rating: A mandatory field representing the review's rating, with a range between 1 and 5.
review: An optional field providing additional comments or feedback about the book.</Model>
<AboutContent>With these models and their associated functionalities, Lithium - Books Management Project provides an intuitive platform for efficiently managing books, user data, and user reviews, creating an optimal experience for all book enthusiasts.</AboutContent>
      </Wrapper>
    </Container>

  )
}
