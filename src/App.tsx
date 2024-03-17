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

interface LetterWithDropShadowEffectProps {
  filter: string;
}

const LetterWithDropShadowEffect = styled.p<LetterWithDropShadowEffectProps>`
  font-family: -apple-system, system-ui, BlinkMacSystemFont;
  font-size: 140px;
  font-style: normal;
  font-weight: 600;
  margin-block-start: 0px;
  margin-block-end: 0px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  color: white;
  -webkit-filter: ${({ filter }) => filter};
  filter:  ${({ filter }) => filter};
`;

function App() {

  return (
    <Container>
      <LetterWithDropShadowEffect filter={"drop-shadow(1.25px -0.67px 2.5px #A3333C) drop-shadow(-0px 0.375px 1.25px #DD7E08)"}>
        Aa
      </LetterWithDropShadowEffect>
    </Container>
  );
}

export default App;
