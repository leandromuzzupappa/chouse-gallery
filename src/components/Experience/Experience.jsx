/* eslint-disable react/no-unknown-property */
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  OrbitControls,
  TransformControls,
  PerspectiveCamera,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

/* import { ArtGallery } from "../models/ArtGallery/ArtGallery"; */
import { ArtGalleryLow } from "../models/ArtGalleryLow/ArtGalleryLow";
import { ArtGalleryTest } from "../models/ArtGalleryTest/ArtGalleryTest";

export const Experience = () => {
  const cameraRef = useRef(null);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -3),
        new THREE.Vector3(2.2, 0, -2.2),
        new THREE.Vector3(3, 0, 0),
        new THREE.Vector3(2.2, 0, 2.2),
        new THREE.Vector3(0, 0, 3),
        new THREE.Vector3(-2.2, 0, 2.2),
        new THREE.Vector3(-3, 0, 0),
        new THREE.Vector3(-3.5, 0, -2.5),
        new THREE.Vector3(-4.5, 0, -4),
        new THREE.Vector3(0, 0, -6),
        new THREE.Vector3(4.5, 0, -4),
        new THREE.Vector3(6, 0, 0),
        new THREE.Vector3(4.5, 0, 4),
        new THREE.Vector3(0, 0, 6),
        new THREE.Vector3(-4.5, 0, 4),
        new THREE.Vector3(-6, 0, 0),
        new THREE.Vector3(-4.5, 0, -4),
      ],
      false,
      "catmullrom",
      0.6
    );
  }, []);

  const linePointsCount = 12000;

  const linePoints = useMemo(() => {
    return curve.getPoints(linePointsCount);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.05);
    shape.lineTo(0, 0.05);

    return shape;
  }, []);

  const scroll = useScroll();

  useFrame((_, delta) => {
    const currentPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );

    const currentPoint = linePoints[currentPointIndex];

    //console.log(currentPointIndex, currentPoint);
    currentPoint.y = 2;
    cameraRef.current?.position.lerp(currentPoint, delta * 24);
  });

  return (
    <>
      <OrbitControls makeDefault enableZoom={false} />

      {/* <ambientLight intensity={0.1} color="red" /> */}
      <TransformControls mode="translate" position={[0, 0, 0]}>
        <pointLight position={[0, 5, 0]} intensity={0.1} color="#fff5e2" />
      </TransformControls>

      <group ref={cameraRef}>
        <PerspectiveCamera position={[0, 0, 0]} fov={75} makeDefault />
      </group>

      <TransformControls
        mode="translate"
        position={[-1, 0.3, 2]}
        showX={true}
        showZ={true}
        showY={true}
      >
        <group scale={0.4} position={[0, -0.05, 0]}>
          <pointLight position={[0, 0, 0]} color="#932fda" intensity={0.5} />
          <mesh position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial
              color="white"
              emissive="white"
              emissiveIntensity={10}
            />
          </mesh>
        </group>
      </TransformControls>

      {/* <ArtGalleryLow /> */}

      <group position-y={0.1}>
        <mesh opacity={0.2}>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: linePointsCount,
                bevelEnabled: false,
                extrudePath: curve,
                transparent: true,
              },
            ]}
          />

          <meshBasicMaterial color="white" opacity={0.2} transparent />
        </mesh>
      </group>

      <Suspense fallback={<ArtGalleryLow />}>
        <ArtGalleryTest />
      </Suspense>
    </>
  );
};
