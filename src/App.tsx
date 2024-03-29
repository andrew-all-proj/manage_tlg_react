import React from 'react';

import Posts from './componets/Main/Posts/Posts';
import SavedPosts from './componets/Main/SavedPosts/SavedPosts';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from './componets/Layout';
import AddMedia from './componets/Main/Media/AddMedia';
import MyChanels from './componets/Main/MyChanels/MyChanels';
import AddNewChannel from './componets/Main/MyChanels/AddNewChannel';
import Tags from './componets/Main/Tags/Tags';
import LoginPage from './componets/LoginPage/LoginPage';
import CreateSchedule from './componets/Main/CreateSchedule/CreateSchedule'
import Docs from './componets/Main/Docs/Docs'


import RequireAuth from './componets/hoc/RequireAuth';
import { AuthProvider } from './componets/hoc/AuthProvider';
import EditChannel from './componets/Main/MyChanels/Channel';
//import EditPost from './componets/Main/Posts/EditPost';
import ScheduleChannel from './componets/Main/ScheduleChannel/ScheduleChannel';
import UserRegistration from './componets/UserRegistration/UserRegistration';
import Bots from './componets/Main/Bots/Bots';
import Settings from './componets/Main/Settings/Settings';
import { useState, useEffect } from "react";
import { useResize } from "./componets/hook/useResize"
import { setMobile, setShowNavBar } from './store/mobileSlice';
import { useAppSelector, useAppDispatch } from './hook_redux';


const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const size = useResize()

  //set mbileMode if change size screen
  useEffect(() => {
    if (!size.isScreenMd) {
      dispatch(setMobile(true ))
      dispatch(setShowNavBar(false))
    } else {
      dispatch(setMobile(false))
      dispatch(setShowNavBar(true))
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
            <Posts />
          </RequireAuth>} />

        <Route path='post' element={
          <RequireAuth >
            <Posts />
          </RequireAuth>
        } />


        <Route path='post/:id_post/:id_event?' element={
          <RequireAuth >
            <Posts />
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

        <Route path='docs' element={
          <RequireAuth >
            <Docs />
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

