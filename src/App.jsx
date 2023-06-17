import { Navbar } from "./components/Navbar/Navbar";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";

/* Pre entrega 1 - Muzzupappa */

function App() {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting="Oreos" />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100px",
          height: "100px",
          background: "red",
        }}
      ></div>
    </>
  );
}

export default App;
