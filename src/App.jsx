import { Navbar } from "./components/Navbar/Navbar";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";

/* Pre entrega 1 - Muzzupappa */

function App() {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting="Oreos" />
    </>
  );
}

export default App;
