/* eslint-disable react/no-unknown-property */
import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";

export const ArtGalleryTest = (props) => {
  const { nodes, materials } = useGLTF("/models/art_gallery_test/scene.gltf");
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group rotation={[Math.PI, 0, 0]} scale={110.41}>
          <mesh
            geometry={nodes.Bench_BenchConcreteBase_0.geometry}
            material={materials.BenchConcreteBase}
          />
          <mesh
            geometry={nodes.Bench_BenchWood_0.geometry}
            material={materials.BenchWood}
          />
        </group>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 22.5]}>
          <mesh
            geometry={nodes.CeillingWire_CeillingWire_0.geometry}
            material={materials.CeillingWire}
          />
          <mesh
            geometry={nodes.CeillingWire_CeillingWire_0001.geometry}
            material={materials.CeillingWire}
          />
          <mesh
            geometry={nodes.CeillingWire_CeillingWire_0002.geometry}
            material={materials.CeillingWire}
          />
          <mesh
            geometry={nodes.CeillingWire_CeillingWire_0003.geometry}
            material={materials.CeillingWire}
          />
          <mesh
            geometry={nodes.CeillingWire_CeillingWire_0004.geometry}
            material={materials.CeillingWire}
          />
          <mesh
            geometry={nodes.CeillingWire_CeillingWire_0005.geometry}
            material={materials.CeillingWire}
          />
          <mesh
            geometry={nodes.CeillingWire_CeillingWire_0006.geometry}
            material={materials.CeillingWire}
          />
        </group>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh
            geometry={nodes.Lamp_Emissive_0.geometry}
            material={materials.Emissive}
          />
          <mesh
            geometry={nodes.Lamp_Lamp_0.geometry}
            material={materials.Lamp}
          />
        </group>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 22.5]}>
          <mesh
            geometry={nodes.LampBase_CeillingWire_0.geometry}
            material={materials.CeillingWire}
          />
          <mesh
            geometry={nodes.LampBase_Emissive_0.geometry}
            material={materials.Emissive}
          />
        </group>
        <group rotation={[-Math.PI / 2, 0, 0.1]} scale={100}>
          <mesh
            geometry={nodes.PaitingsInside_1.geometry}
            material={materials.Painting}
          />
          <mesh
            geometry={nodes.PaitingsInside_2.geometry}
            material={materials.Painting}
          />
          <mesh
            geometry={nodes.PaitingsInside_3.geometry}
            material={materials.Painting}
          />
          <mesh
            geometry={nodes.PaitingsInside_4.geometry}
            material={materials.Painting}
          />
        </group>
        <mesh
          geometry={nodes.PaitingsInside001_Painting_0.geometry}
          material={materials.Painting}
          rotation={[-Math.PI / 2, 0, 0.1]}
          scale={100}
        />
        <mesh
          geometry={nodes.PaitingsOutside_Painting_0.geometry}
          material={materials.Painting}
          rotation={[-Math.PI / 2, 0, 0.1]}
          scale={100}
        />
        <group rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 22.5]}>
          <mesh
            geometry={nodes.Walls_Ceilling_0.geometry}
            material={nodes.Walls_Ceilling_0.material}
          />
          <mesh
            geometry={nodes.Walls_Emissive_0.geometry}
            material={nodes.Walls_Emissive_0.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Walls_Floor_0.geometry}
          >
            <MeshReflectorMaterial
              resolution={512}
              blur={[1000, 1000]}
              mixBlur={0.1}
              mirror={0.8}
              color="#7b7b7b"
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Walls_Walls_0.geometry}
          >
            <MeshReflectorMaterial
              resolution={512}
              blur={[300, 300]}
              mixBlur={1}
              mirror={0.5}
              color="#5c5c5c"
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/art_gallery_test/scene.gltf");
