import Analysispage from "./Components/Analysispage/Analysispage";
import Articlespage from "./Components/Articlespage/Articlespage";
import Mainpage from "./Components/Mainpage/Mainpage";
import {Routes,Route} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path="/" element={<Mainpage/>}/>
        <Route  path="/analysis" element={<Analysispage/>}/>
        <Route  path="/articles" element={<Articlespage/>}/>
      </Routes>
    </div>
  );
}

export default App;
