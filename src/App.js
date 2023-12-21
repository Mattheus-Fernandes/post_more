//CSS
import './App.css';

//COMPONENT
import Navbar from './component/Navbar/Navbar';

//PAGES
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Register from './pages/Register/Register';

//CONTEXT
import { AuthProvider } from './context/useAuthContext';

//HOOKS
import { useAuthentication } from './hooks/useAuthentication';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { onAuthStateChanged } from '@firebase/auth';
import { useState, useEffect } from 'react';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])


  if(loadingUser){
    return <h2>Carregando...</h2>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/register' element={<Register />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
