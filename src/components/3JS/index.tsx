// MARK: NPM Modules
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


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
  const controls = new OrbitControls( camera, renderer.domElement );

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

    /// Create the color

    const red = new THREE.Color(1,0,0);
    const green = new THREE.Color(0,0,1);
    const blue = new THREE.Color(0,1,0);
    const pink = new THREE.Color(1,1,0);
    const yellow = new THREE.Color(1,0,1);
    const cyan = new THREE.Color(0,1,1);

    // There are 4 vertices on 6 faces - therefore there are 24 colors.
    // Set teh colors for each vertex of each face.

    const colors = new Float32Array([
      red.r, red.b, red.g,  // Right Face | Top Right 
      red.r, red.b, red.g,  // Right Face | Top Left 
      red.r, red.b, red.g,  // Right Face | Bottom Right 
      red.r, red.b, red.g,  // Right Face | Bottom Left 

      green.r, green.b, green.g, // Left Face | Top Right
      green.r, green.b, green.g, // Left Face | Top Left
      green.r, green.b, green.g, // Left Face | Bottom Right
      green.r, green.b, green.g, // Left Face | Bottom Left

      blue.r, blue.b, blue.g, // Top Face | Top Right
      blue.r, blue.b, blue.g, // Top Face | Top Left
      blue.r, blue.b, blue.g, // Top Face | Bottom Right
      blue.r, blue.b, blue.g, // Top Face | Bottom Left

      pink.r, pink.b, pink.g, // Bottom Face | Top Right
      pink.r, pink.b, pink.g, // Bottom Face | Top Left
      pink.r, pink.b, pink.g, // Bottom Face | Bottom Right
      pink.r, pink.b, pink.g, // Bottom Face | Bottom Left

      yellow.r, yellow.b, yellow.g, // Front Face | Top Right
      yellow.r, yellow.b, yellow.g, // Front Face | Top Left
      yellow.r, yellow.b, yellow.g, // Front Face | Bottom Right
      yellow.r, yellow.b, yellow.g, // Front Face | Bottom Left

      cyan.r, cyan.b, cyan.g, // Back Face | Top Right
      cyan.r, cyan.b, cyan.g, // Back Face | Top Left
      cyan.r, cyan.b, cyan.g, // Back Face | Bottom Right
      cyan.r, cyan.b, cyan.g, // Back Face | Bottom Left
    ]);
    
    // Set the color attribute
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

    // Add the Plane
    scene.add(cube);

    // Position the camera
    camera.position.z = 5;
    renderer.render(scene, camera);
    animate();

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
    controls.update();
    renderer.render(scene, camera);
  };

  // MARK: Render
  return <Container ref={containerRef}></Container>;
};

export default Scene;
