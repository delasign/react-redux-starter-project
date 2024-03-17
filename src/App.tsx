import React from "react";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

interface OutlinedLetterProps {
  strokeColor: string;
  strokeWidth: number;
}

// Answer from Ryall (https://stackoverflow.com/users/147731/ryall)
// https://stackoverflow.com/questions/26634201/add-stroke-around-text-on-the-outside-with-css

const OutlinedLetter = styled.p<OutlinedLetterProps>`
  font-family: -apple-system, system-ui, BlinkMacSystemFont;
  font-size: 140px;
  font-style: normal;
  font-weight: 600;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  color: white;
  text-shadow: ${({ strokeColor, strokeWidth }) => 
  "-"+strokeWidth+"px -"+strokeWidth+"px  0 "+strokeColor+", "
  + "0px -"+strokeWidth+"px 0 "+strokeColor+", "
  + ""+strokeWidth+"px -"+strokeWidth+"px  0 "+strokeColor+", "
  + ""+strokeWidth+"px 0px  0 "+strokeColor+", "
  + ""+strokeWidth+"px "+strokeWidth+"px  0 "+strokeColor+", "
  + "0px "+strokeWidth+"px  0 "+strokeColor+", "
  + "-"+strokeWidth+"px "+strokeWidth+"px  0 "+strokeColor+", "
  + "-"+strokeWidth+"px 0px  0 "+strokeColor+""};
  paint-order: fill stroke; 
`;

function App() {
  return (
    <Container>
      <OutlinedLetter strokeWidth={1} strokeColor={"black"}>
        Aa
      </OutlinedLetter>
    </Container>
  );
}

export default App;
