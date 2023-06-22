/* eslint-disable react/no-unknown-property */
import { Suspense } from "react";
import {
  OrbitControls,
  TransformControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { ArtGallery } from "../models/ArtGallery/ArtGallery";
import { ArtGalleryLow } from "../models/ArtGalleryLow/ArtGalleryLow";

export const Experience = () => {
  return (
    <>
      <OrbitControls makeDefault enableZoom={true} />

      <TransformControls mode="translate" position={[0, 0, 0]}>
        <pointLight position={[0, 5, 0]} intensity={0.6} color="#fff5e2" />
      </TransformControls>

      <PerspectiveCamera position={[0, 1, 5]} fov={75} makeDefault />

      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* <ArtGalleryLow /> */}

      <Suspense fallback={<ArtGalleryLow />}>
        <ArtGallery />
      </Suspense>
    </>
  );
};
