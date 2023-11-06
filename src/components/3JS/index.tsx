// MARK: NPM Modules
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";

// MARK: Redux
// MARK: Types
// MARK: Components
// MARK: Shaders
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

    // Create a plane
    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    // Standard Material
    const planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // Add the Plane
    scene.add(plane);

    // Add a Light
    let light = new THREE.AmbientLight(0xe5df25);
    light.intensity = 1;
    light.position.set(0, 0, 1);
    scene.add(light);

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