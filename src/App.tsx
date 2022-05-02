import React from "react";
import styled from "styled-components";
import "./App.css";

import { RootState } from "redux-functionality";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  setCounter,
  incrementByAmount,
} from "redux-functionality/slices/counterSlice";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: black;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Button = styled.div`
  color: black;
  font-size: 18px;
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 8px;
  cursor: pointer;
  color: black;
  background-color: white;

  :hover {
    color: white;
    background-color: black;
  }
`;

const Input = styled.input`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  color: black;
  font-size: 18px;
`;

function App() {
  const counter: number = useSelector(
    (state: RootState) => state.counter.value
  );
  const dispatch = useDispatch();
  return (
    <Container>
      <CounterContainer>
        <p>
          Counter Value : <b>{counter}</b>
        </p>
        <br />
        <ButtonContainer>
          <Button
            onClick={() => {
              dispatch(increment());
            }}
          >
            Add 1
          </Button>
          <Button
            onClick={() => {
              dispatch(decrement());
            }}
          >
            Subtract 1
          </Button>
          <Button
            onClick={() => {
              dispatch(incrementByAmount(10));
            }}
          >
            Add 10
          </Button>
          <Button
            onClick={() => {
              dispatch(incrementByAmount(-10));
            }}
          >
            Subtract 10
          </Button>
        </ButtonContainer>
        <br />
        <ButtonContainer>
          <p>Or set it here</p>
          <Input
            value={counter}
            onChange={(ev) => {
              const newValue = ev.target.value;
              dispatch(setCounter(parseFloat(newValue)));
            }}
          />
        </ButtonContainer>
      </CounterContainer>
    </Container>
  );
}

export default App;
