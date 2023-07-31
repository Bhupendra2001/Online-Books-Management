import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left : 20px;
`;
const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  width : 250px;
`;

const RatingInput = styled.input`
  margin-bottom: 20px;
  outline : none;
  border : 1px solid gray;
  padding-left : 10px;
`;

const CommentsInput = styled.textarea`
  margin-bottom: 20px;
  outline : none;
  border : 1px solid gray;
  border-radius : 10px;
  padding : 5px;
`;

const SubmitButton = styled.button`
  background-color: teal;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ReviewModal = ({ isOpen, onClose, onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = () => {
    onSubmitReview({ rating, comments });
    onClose();
  };
   
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Give Your Rating</h3>
        <RatingInput
          type="number"
          min={0}
          max={5}
          value={rating}
          onChange={handleRatingChange}
        />
        <CommentsInput
          placeholder="Enter your comments..."
          value={comments}
          onChange={handleCommentsChange}
        />
        <SubmitButton onClick={handleSubmit}>Done</SubmitButton>
        <CloseButton onClick={handleClose}>Cancel</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReviewModal;
