
const vertexShader = `
    attribute vec3 aVertexColor;
    varying vec3 vColor;

      void main() {
        vColor = aVertexColor;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
export default vertexShader;