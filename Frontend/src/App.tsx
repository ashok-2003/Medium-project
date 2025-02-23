import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin';
import { Blogs } from './pages/Blogs';
import { Blog } from './pages/Blog';
import { Publish } from './pages/Publish';
import { DashboardorSignin } from './pages/DashboardorSignin';

function App() {
  return (
    <>
      <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<DashboardorSignin />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blog/:id' element= {<Blog />} />
            <Route path='/publish' element = { <Publish />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App
