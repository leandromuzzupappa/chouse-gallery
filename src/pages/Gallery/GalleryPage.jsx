import { Canvas } from "@react-three/fiber";
import { Experience } from "../../components/Experience/Experience";
import "./GalleryPage.css";

export const GalleryPage = () => {
  return (
    <div className="gallery-page">
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  );
};
