/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import "./ProductMedia.css";
import "../../webgl/shaders/WaveShaderMaterial";
import * as THREE from "three";
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";

export const ProductMedia = ({ image }) => {
  const canvasRef = useRef();
  const waveRef = useRef();

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = -(clientY / innerHeight) * 2 + 1;

    if (waveRef.current) {
      gsap.to(waveRef.current.position, {
        duration: 1,
        ease: "power3.out",
        x: x * 0.2,
        y: y * 0.2,
      });
    }
  };
  const handleMouseLeave = () => {
    if (waveRef.current) {
      gsap.to(waveRef.current.position, {
        duration: 1,
        ease: "elastic.out(1, .3)",
        x: 0,
        y: 0,
      });
    }
  };

  return (
    <>
      <Canvas
        camera={{ fov: 10, position: [0, 0, 5] }}
        ref={canvasRef}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <Wave imageSrc={image} myRef={waveRef} />

        <OrbitControls maxDistance={15} minDistance={4} />
      </Canvas>
    </>
  );
};

const Wave = ({ imageSrc, myRef }) => {
  const imageRef = useRef();

  useFrame(({ clock }) => {
    imageRef.current.uTime = clock.elapsedTime;
  });

  const [image] = useLoader(THREE.TextureLoader, [imageSrc]);

  return (
    <Suspense fallback={null}>
      <mesh ref={myRef}>
        <planeGeometry args={[0.4, 0.6, 16, 16]} />
        <waveShaderMaterial uColor="blue" uTexture={image} ref={imageRef} />
      </mesh>
    </Suspense>
  );
};
