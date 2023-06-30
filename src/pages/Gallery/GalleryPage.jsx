import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Experience } from "../../components/Experience/Experience";
import "./GalleryPage.css";

export const GalleryPage = () => {
  return (
    <div className="gallery-page">
      <Canvas>
        <ScrollControls pages={5} damping={0.3}>
          <Experience />
        </ScrollControls>

        {
          <EffectComposer>
            <Bloom mipmapBlur luminanceThreshold={0.7} radius={0.5} />
          </EffectComposer>
        }
      </Canvas>
    </div>
  );
};
