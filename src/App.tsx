import React from 'react';
import style from './App.module.css'
import Header from './componets/Heder/Header';
import Navbar from './componets/Navbar/Navbar';
import CreatePosts from './componets/Main/CreatePost/CreatePosts';
import SavedPosts from './componets/Main/SavedPosts/CreatePosts';
import Footer from './componets/Footer/Footer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from './componets/Layout';
import CreateSchedule from './componets/Main/CreateSchedule/CreateSchedule';
import AddMedia from './componets/Main/AddMedia/AddMedia';
import MyChanels from './componets/Main/MyChanels/MyChanels';
import Tags from './componets/Main/Tags/Tags';




const App: React.FC = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<CreatePosts />} />
            <Route path='createpost' element={<CreatePosts />} />
            <Route path='savedposts' element={<SavedPosts />} />
            <Route path='createschedule' element={<CreateSchedule />} />
            <Route path='addmedia' element={<AddMedia />} />
            <Route path='mychanels' element={<MyChanels />} />
            <Route path='tags' element={<Tags />} />
            <Route path='*' element={<h3>NOT FOUND PAGE</h3>} />
          </Route>
        </Routes>
    </>
  )
}

export default App