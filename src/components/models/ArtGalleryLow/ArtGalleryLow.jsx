/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function ArtGalleryLow(props) {
  const { nodes } = useGLTF("/models/art_gallery_low/art_gallery_low.glb");

  const _material = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    color: "#999",
  });

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    _material.opacity = Math.max(Math.abs(Math.sin(time * 3)), 0.3);
  });

  const renderMesh = (name) => {
    const { geometry } = nodes[name];

    return (
      <mesh key={name} geometry={geometry}>
        <primitive object={_material} attach="material" />
      </mesh>
    );
  };

  return (
    <group {...props} dispose={null} castShadow receiveShadow>
      <group scale={0.01}>
        <group rotation={[Math.PI, 0, 0]} scale={110.41}>
          {renderMesh("Bench_BenchConcreteBase_0")}
          {renderMesh("Bench_BenchWood_0")}
        </group>

        <group rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 22.5]}>
          {renderMesh("CeillingWire_CeillingWire_0")}
          {renderMesh("CeillingWire_CeillingWire_0001")}
          {renderMesh("CeillingWire_CeillingWire_0002")}
          {renderMesh("CeillingWire_CeillingWire_0003")}
          {renderMesh("CeillingWire_CeillingWire_0004")}
          {renderMesh("CeillingWire_CeillingWire_0005")}
          {renderMesh("CeillingWire_CeillingWire_0006")}
        </group>

        <group rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 22.5]}>
          {renderMesh("LampBase_CeillingWire_0")}
          {renderMesh("LampBase_Emissive_0")}
        </group>

        {renderMesh("PaitingsInside_Painting_0")}
        {renderMesh("PaitingsInside001_Painting_0")}
        {renderMesh("PaitingsOutside_Painting_0")}

        <group rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 22.5]}>
          {renderMesh("Walls_Ceilling_0")}
          {renderMesh("Walls_Emissive_0")}
          {renderMesh("Walls_Floor_0")}
          {renderMesh("Walls_Walls_0")}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/art_gallery_low/art_gallery_low.glb");
