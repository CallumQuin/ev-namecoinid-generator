import AssetForm from './AssetForm';
import EVAssets from "./EVAssets";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<AssetForm />} />
      <Route path="/:prefix/:domain" element={<EVAssets />}/>
     </Routes>
    </div>
  );
}

export default App;
