import { Route, Routes } from "react-router-dom";
import AllAbsences from "./pages/AllAbsences";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AllAbsences />}></Route>
      </Routes>
    </div>
  );
}

export default App;
