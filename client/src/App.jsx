import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import AuthPage from './pages/Authentication';
import LoginForm from './components/Login-form';
import RegisterForm from './components/Register-form';
import ForgotPasswordPage from './components/Forget-password';
import Home from './pages/Home';
import StudentsPage from './components/Student';
import CoursesPage from './components/Course';
import FeesPage from './components/Fees';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refresh } from './redux/slice/authSlice';
import {Toaster} from 'react-hot-toast';
import Teacher from './components/Teacher.jsx';

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(refresh())
  }, [])
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/auth' element={<AuthPage />}>
       <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<RegisterForm />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
       
      </Route>
      <Route path='/student-management' element={<StudentsPage />} />
      <Route path='/course-management' element={<CoursesPage />} />
      <Route path='/fees-management' element={<FeesPage />} />
      <Route path='/teacher-management' element={<Teacher />} />
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
