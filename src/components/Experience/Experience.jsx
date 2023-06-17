/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <OrbitControls makeDefault />

      <pointLight position={[10, 10, 10]} intensity={0.9} />

      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
};
