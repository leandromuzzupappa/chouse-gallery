/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import "./ProductGridGL.css";
import "../../webgl/shaders/DissortImageMaterial";
import * as THREE from "three";
import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";

export const ProductGridGL = ({
  image,
  images,
  progress,
  listSizes,
  velocity,
}) => {
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
        style={{ pointerEvents: "none" }}
        camera={{
          fov: 2 * Math.atan(window.innerHeight / 2 / 600) * (180 / Math.PI),
          position: [0, 0, 600],
          near: 100,
          far: 2000,
        }}
        gl={(canvas) => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
          });

          console.log("lenny", canvas.width, canvas.height);
          renderer.setSize(canvas.width, canvas.height);
        }}
        ref={canvasRef}
      >
        {images.map(({ image, width, height, top, left, x }, index) => {
          if (!image) return null;

          const ww = window.innerWidth;
          const wh = window.innerHeight;

          top = wh / -2 + height / 2 + top + 96;
          left = ww / -2 + width / 2 + left;

          top = top - progress * listSizes.height;

          return (
            <Image
              key={index}
              imageSrc={image}
              myRef={waveRef}
              sizes={{ width, height }}
              position={{ top, left }}
              progress={progress}
              velocity={velocity}
            />
          );
        })}

        <OrbitControls />
      </Canvas>
    </>
  );
};

const Image = ({ imageSrc, myRef, sizes, position, velocity, progress }) => {
  const imageRef = useRef();

  useFrame(({ clock }) => {
    if (imageRef.current) {
      imageRef.current.uTime = clock.elapsedTime;
      imageRef.current.uVelocity = velocity * 10;
      imageRef.current.uProgress = progress;
    }
  });

  const [image] = useLoader(THREE.TextureLoader, [imageSrc]);

  return (
    <Suspense fallback={null}>
      <mesh ref={myRef} position={[position.left, position.top * -1, 1]}>
        <planeGeometry args={[sizes.width, sizes.height, 100, 100]} />
        <dissortImageMaterial uColor="blue" uTexture={image} ref={imageRef} />
      </mesh>
    </Suspense>
  );
};
