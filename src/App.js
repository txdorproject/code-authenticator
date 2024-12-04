import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeAuthentication from "./pages/CodeAuthentication.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CodeAuthentication />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
