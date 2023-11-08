// MARK: NPM Modules
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";


// MARK: Redux
// MARK: Types
// MARK: Components
// MARK: Shaders
import vertexShader from "shaders/sample/vertex";
import fragmentShader from "shaders/sample/fragment";
// MARK: Functionality
// MARK: Utils

// MARK: Styled Components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: none;
`;

// MARK: React Component
// Props
interface Props {}

// Component
const Scene = ({}: Props) => {
  // MARK: Refs
  const containerRef: any = useRef(null);

  // MARK: State Variables
  // MARK: Use Effects

  useEffect(() => {
    // componentDidMount events
    // Render the scene
    renderScene();
    // Add the resize listener
    window.addEventListener("resize", onWindowResize, false);

    return () => {
      // componentWillUnmount events
      // Make sure to remove the renderer from the container, to avoid ThreeJS drawing an additional canvas everytime you make changes to the code.
      containerRef.current.removeChild(renderer.domElement);
      // Remove the event listener
      window.removeEventListener("resize", onWindowResize, false);
    };
  }, []);

  // MARK: Variables
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  const camera = new THREE.PerspectiveCamera();

  // MARK: Functionality
  const renderScene = () => {
    // Clear the Scene
    scene.clear();
    // Create a scene, camera, and renderer
    camera.fov = 75;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.near = 0.1;
    camera.far = 1000;
    // Set up the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create a plane that matches the camera view
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    /// Create a custom attribute for the colors

    const red = new THREE.Color(1,0,0);
    const green = new THREE.Color(0,1,0);
    const blue = new THREE.Color(0,0,1);

    // There are 4 vertices on 6 faces - therefore there are 24 colors.
    const colors = new Float32Array([
      red.r, red.b, red.g,  // Red
      green.r, green.b, green.g, // Green
      blue.r, blue.b, blue.g,  // Blue
      blue.r, blue.b, blue.g,  // Blue
      green.r, green.b, green.g, // Green
      red.r, red.b, red.g,  // Red

      1, 0, 0,  // Red
      0, 1, 0,  // Green
      0, 0, 1,  // Blue
      1, 1, 0,  // Yellow
      1, 0, 1,  // Magenta
      0, 1, 1,  // Cyan

      1, 0, 0,  // Red
      0, 1, 0,  // Green
      0, 0, 1,  // Blue
      1, 1, 0,  // Yellow
      1, 0, 1,  // Magenta
      0, 1, 1,  // Cyan

      1, 0, 0,  // Red
      0, 1, 0,  // Green
      0, 0, 1,  // Blue
      1, 1, 0,  // Yellow
      1, 0, 1,  // Magenta
      0, 1, 1,  // Cyan
    ]);

    const colorAttribute = new THREE.BufferAttribute(colors, 3); // 3 components (RGB) per vertex
    geometry.setAttribute("aVertexColor", colorAttribute);

    // Standard Material
    // const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      vertexColors: true
    })
    
    const cube = new THREE.Mesh(geometry, material);

    cube.rotation.x += 45;
    cube.rotation.y += 30;

    // Add the Plane
    scene.add(cube);

    // Position the camera
    camera.position.z = 5;
    renderer.render(scene, camera);

  };
  // When the window resizes adapt the scene
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // Create an animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.clear();
    renderer.render(scene, camera);
  };

  // MARK: Render
  return <Container ref={containerRef}></Container>;
};

export default Scene;
