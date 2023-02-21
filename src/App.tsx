import React from 'react';
import style from './App.module.css'
import Header from './componets/Heder/Header';
import Navbar from './componets/Navbar/Navbar';
import CreatePosts from './componets/Main/Posts/CreatePosts';
import SavedPosts from './componets/Main/SavedPosts/SavedPosts';
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
import AddNewChannel from './componets/Main/MyChanels/AddNewChannel';
import Tags from './componets/Main/Tags/Tags';
import LoginPage from './componets/LoginPage/LoginPage';


import RequireAuth from './componets/hoc/RequireAuth';
import { AuthProvider } from './componets/hoc/AuthProvider';
import EditChannel from './componets/Main/MyChanels/Channel';
import EditPost from './componets/Main/Posts/EditPost';
import ScheduleChannel from './componets/Main/ScheduleChannel/ScheduleChannel';



const App: React.FC = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route>
            <Route path='login' element={<LoginPage />} />
          </Route>

          <Route path='/' element={<Layout />}>
            <Route index element={<CreatePosts />} />

            <Route path='createpost' element={
              <RequireAuth>
                <CreatePosts /> 
              </RequireAuth>
              } />

            <Route path='post/:id/:id_channel?' element={
              <RequireAuth>
                <EditPost /> 
              </RequireAuth>
              } />

            <Route path='savedposts' element={
              <RequireAuth>
                <SavedPosts />
              </RequireAuth>} />

            <Route path='createschedule' element={<CreatePosts />} />
            <Route path='addmedia' element={<AddMedia />} />

            <Route path='channels' element={
              <RequireAuth>
                <MyChanels />
              </RequireAuth>} />

              <Route path='channel/:id' element={
              <RequireAuth>
                <EditChannel />
              </RequireAuth>} />
            
            <Route path='addnewchannel' element={
            <RequireAuth>
              <AddNewChannel />
            </RequireAuth>} />

            <Route path='schedule_channel' element={
            <RequireAuth>
              <ScheduleChannel />
            </RequireAuth>} />

            <Route path='tags' element={<Tags />} />
            <Route path='*' element={<h3>NOT FOUND PAGE</h3>} />
          </Route>

        </Routes>
    </AuthProvider>
  )
}

export default App

