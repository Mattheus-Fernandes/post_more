//CSS
import './App.css';

//COMPONENT
import Navbar from './component/Navbar/Navbar';

//PAGES
import Home from "./pages/Home/Home"
import About from "./pages/About/About"

import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
