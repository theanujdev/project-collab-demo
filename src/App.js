import "bootstrap/dist/css/bootstrap.min.css";
import DataContext from "./contexts/DataContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <DataContext>
      <HomePage />
    </DataContext>
  );
}

export default App;
