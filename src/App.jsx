import React from 'react';

import CreatePosts from './componets/Main/Posts/CreatePosts';
import SavedPosts from './componets/Main/SavedPosts/SavedPosts';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from './componets/Layout';
import AddMedia from './componets/Main/Media/AddMedia';
import MyChanels from './componets/Main/MyChanels/MyChanels';
import AddNewChannel from './componets/Main/MyChanels/AddNewChannel';
import Tags from './componets/Main/Tags/Tags';
import LoginPage from './componets/LoginPage/LoginPage';
import CreateSchedule from './componets/Main/CreateSchedule/CreateSchedule'


import RequireAuth from './componets/hoc/RequireAuth';
import { AuthProvider } from './componets/hoc/AuthProvider';
import EditChannel from './componets/Main/MyChanels/Channel';
import EditPost from './componets/Main/Posts/EditPost';
import ScheduleChannel from './componets/Main/ScheduleChannel/ScheduleChannel';
import UserRegistration from './componets/UserRegistration/UserRegistration';
import Bots from './componets/Main/Bots/Bots';
import Settings from './componets/Main/Settings/Settings';
import { useState, useEffect } from "react";
import { useResize } from "./componets/hook/useResize"
import { useSelector, useDispatch } from 'react-redux';
import { setMobile, setShowNavBar } from './store/mobileSlice';



const App = () => {
  const dispatch = useDispatch()
  const size = useResize()

  useEffect(() => {
    if (!size.isScreenMd) {
      dispatch(setMobile({ mobileMode: true }))
      dispatch(setShowNavBar({ showNavBar: false }))
    } else {
      dispatch(setMobile({ mobileMode: false }))
      dispatch(setShowNavBar({ showNavBar: true }))
    }

  }, [size.isScreenMd]);


  return (
    <Routes>
      <Route>
        <Route path='login' element={<LoginPage />} />
      </Route>

      <Route>
        <Route path='user_reg' element={<UserRegistration />} />
      </Route>

      <Route path='/' element={<Layout />} >
        <Route index element={
          <RequireAuth >
            <CreatePosts />
          </RequireAuth>} />

        <Route path='createpost' element={
          <RequireAuth >
            <CreatePosts />
          </RequireAuth>
        } />

        <Route path='post/:id/:id_event?' element={
          <RequireAuth >
            <EditPost />
          </RequireAuth>
        } />

        <Route path='savedposts' element={
          <RequireAuth >
            <SavedPosts />
          </RequireAuth>} />

        <Route path='createschedule' element={
          <RequireAuth>
            <CreateSchedule />
          </RequireAuth>} />

        <Route path='addmedia' element={
          <RequireAuth>
            <AddMedia />
          </RequireAuth>} />

        <Route path='channels' element={
          <RequireAuth >
            <MyChanels />
          </RequireAuth>} />

        <Route path='channel/:id' element={
          <RequireAuth>
            <EditChannel />
          </RequireAuth>} />

        <Route path='addnewchannel' element={
          <RequireAuth >
            <AddNewChannel />
          </RequireAuth>} />

        <Route path='schedule_channel' element={
          <RequireAuth >
            <ScheduleChannel />
          </RequireAuth>} />

        <Route path='tags' element={
          <RequireAuth >
            <Tags />
          </RequireAuth>} />
        
          <Route path='bots' element={
          <RequireAuth >
            <Bots />
          </RequireAuth>} />

        <Route path='settings' element={
          <RequireAuth >
            <Settings />
          </RequireAuth>} />

        <Route path='*' element={<h3>NOT FOUND PAGE</h3>} />
      </Route>

    </Routes>
  )
}

export default App

