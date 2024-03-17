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
  backgroundGradient: string;
}

const GradientLetter = styled.p<OutlinedLetterProps>`
  font-family: -apple-system, system-ui, BlinkMacSystemFont;
  font-size: 140px;
  font-style: normal;
  font-weight: 600;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  background: ${({ backgroundGradient }) => backgroundGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

function App() {

  const gradients = [
    "#A3333C",
    "#DD7E08",
    "#F2BA59",
    "#444621",
    "#437CC7",
    "#944578",
    "#000000"
  ];

  const constructGradient = (): string => {
    var gradient = "linear-gradient(to right, "

    for (let i = 0; i < gradients.length; i++) {
      gradient += gradients[i] + " " + 100/(gradients.length-1)*i + "%"
      if (i !== gradients.length - 1) {
        gradient += ", "
      }
    }

    gradient += ")"
    return gradient;
  }

  return (
    <Container>
      <GradientLetter backgroundGradient={constructGradient()}>
        Aa
      </GradientLetter>
    </Container>
  );
}

export default App;
