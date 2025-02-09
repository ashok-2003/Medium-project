import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin';
import { Blogs } from './pages/Blogs';

function App() {
  return (
    <>
      <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/blogs' element={<Blogs />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App
