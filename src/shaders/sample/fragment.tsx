const fragmentShader = `
    varying vec3 vNormal;
    uniform vec3 pointLightPosition;
    uniform vec3 pointLightColor;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 normalizedLight = normalize(pointLightPosition);
      vec3 lightDirection = gl_FragCoord.xyz - normalizedLight;
      float intensity = max(dot(normal, lightDirection), 0.0);
      vec3 lighting = pointLightColor * intensity;
      gl_FragColor = vec4(lighting, 1.0);
    }
  `;

export default fragmentShader;
