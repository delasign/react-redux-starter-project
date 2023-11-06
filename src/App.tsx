// MARK: NPM Modules
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";
// MARK: CSS
import "./App.css";

// MARK: Redux
import { RootState } from "redux-functionality";
import { useDispatch, useSelector } from "react-redux";
// MARK: Types
// MARK: Components
import Scene from "components/3JS";
// MARK: Shaderss
// MARK: Functionality
// MARK: Utils
// MARK: Styled Components

function App() {
  return <Scene />;
}

export default App;
