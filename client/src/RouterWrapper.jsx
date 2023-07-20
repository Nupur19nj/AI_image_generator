import React from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { Home, CreatePost } from './pages/index'; 
// import './Styles.css'; 
import './CreatePost.css';
const RouterWrapper = () => {
  const location = useLocation();
  const isCreatePostPage = location.pathname === '/create-post';

  return (
    <main className={`landing-page sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] ${isCreatePostPage ? 'no-background-image' : 'back-in'}`}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-post' element={<CreatePost />} />
      </Routes>
    </main>
  );
};

export default RouterWrapper;
