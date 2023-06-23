import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { Experience } from "../../components/Experience/Experience";
import "./GalleryPage.css";

export const GalleryPage = () => {
  return (
    <div className="gallery-page">
      <Canvas>
        <ScrollControls pages={5} damping={0.3}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
};
