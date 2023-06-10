import { Navbar } from "./components/Navbar/Navbar";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";

function App() {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting="Oreos" />
    </>
  );
}

export default App;
