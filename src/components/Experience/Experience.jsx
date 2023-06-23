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
import { ArtGallery } from "../models/ArtGallery/ArtGallery";
import { ArtGalleryLow } from "../models/ArtGalleryLow/ArtGalleryLow";

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
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, []);

  const scroll = useScroll();

  useFrame((_, delta) => {
    const currentPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );

    const currentPoint = linePoints[currentPointIndex];

    console.log(currentPointIndex, currentPoint);
    currentPoint.y = 2;
    cameraRef.current?.position.lerp(currentPoint, delta * 24);
  });

  return (
    <>
      <OrbitControls makeDefault enableZoom={false} />

      <TransformControls mode="translate" position={[0, 0, 0]}>
        <pointLight position={[0, 5, 0]} intensity={0.6} color="#fff5e2" />
      </TransformControls>

      <PerspectiveCamera
        ref={cameraRef}
        position={[0, 1, 5]}
        fov={75}
        makeDefault
      />

      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* <ArtGalleryLow /> */}

      <group position-y={0.5}>
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: linePointsCount,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />

          <meshBasicMaterial color="red" opacity={0.7} transparent />
        </mesh>
      </group>

      <Suspense fallback={<ArtGalleryLow />}>
        <ArtGallery />
      </Suspense>
    </>
  );
};
