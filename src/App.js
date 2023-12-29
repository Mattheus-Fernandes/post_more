//CSS
import './App.css';

//COMPONENT
import Navbar from './component/Navbar/Navbar';

//PAGES
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from "./pages/Dashboard/Dashboard";
import NewPost from "./pages/NewPost/NewPost";
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
//CONTEXT
import { AuthProvider } from './context/useAuthContext';

//HOOKS
import { useAuthentication } from './hooks/useAuthentication';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { onAuthStateChanged } from '@firebase/auth';
import { useState, useEffect } from 'react';
import EditPost from './pages/EditPost/EditPost';

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
            <Route path="/search" element={<Search />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path='/posts/create' element={user ? <NewPost /> : <Navigate to="/login"/>} />
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login"/>} />
            <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to=""/>} />
            <Route path='/about' element={<About />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
