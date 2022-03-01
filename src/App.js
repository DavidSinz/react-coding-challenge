import { Route, Routes } from "react-router-dom";
import AbsenceView from "./pages/AbsenceView";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AbsenceView />}></Route>
      </Routes>
    </>
  );
}

export default App;
