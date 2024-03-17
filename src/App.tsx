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

const LetterContainer = styled.div`
  position: relative;
`

interface GradientLetterProps {
  backgroundGradient: string;
}

const GradientLetter = styled.p<GradientLetterProps>`
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

interface OutlinedLetterProps {
  strokeColor: string;
  strokeWidth: number;
}

// Answer from Ryall (https://stackoverflow.com/users/147731/ryall)
// https://stackoverflow.com/questions/26634201/add-stroke-around-text-on-the-outside-with-css
// We have adapted it by applying an absolute position, a z-index, a top and a left.

const OutlinedLetter = styled.p<OutlinedLetterProps>`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
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

interface GradientAndLetterAsOneProps {
  backgroundGradient: string;
  strokeColor: string;
  strokeWidth: number;
}


const GradientAndLetterAsOne = styled.p<GradientAndLetterAsOneProps>`
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
  background: ${({ backgroundGradient }) => backgroundGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

function App() {

  const text = "Aa"

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

  const renderCombinedGradientAndText = () => {
    return (
      <Container>
        <GradientAndLetterAsOne backgroundGradient={constructGradient()} strokeWidth={2} strokeColor={"black"} aria-hidden={true}>
          {text}
        </GradientAndLetterAsOne>
      </Container>
    );
  }

  const renderSuperpositionedText = () => {
    return (
      <Container>
        <LetterContainer>
        <GradientLetter backgroundGradient={constructGradient()}>
          {text}
        </GradientLetter>
        <OutlinedLetter strokeWidth={2} strokeColor={"black"} aria-hidden={true}>
          {text}
        </OutlinedLetter>
        </LetterContainer>
      </Container>
    );
  }

  return renderSuperpositionedText();
}

export default App;
