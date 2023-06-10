import TodoPage from './pages/TodoPage';
import LoginPage from './pages/LoginPages';
import SignupPage from './pages/SignupPage';
import './style.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <TodoPage /> : <Navigate to='/login' />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
