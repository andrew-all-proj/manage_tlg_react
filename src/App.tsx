import React from 'react';

import CreatePosts from './componets/Main/Posts/CreatePosts';
import SavedPosts from './componets/Main/SavedPosts/SavedPosts';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from './componets/Layout';
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
import UserRegistration from './componets/UserRegistration/UserRegistration';



const App: React.FC = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route>
            <Route path='login' element={<LoginPage />} />
          </Route>

          <Route>
            <Route path='user_reg' element={<UserRegistration />} />
          </Route>

          <Route path='/' element={<Layout />}>
            <Route index element={
              <RequireAuth>
                <CreatePosts />
              </RequireAuth>} />

            <Route path='createpost' element={
              <RequireAuth>
                <CreatePosts /> 
              </RequireAuth>
              } />

            <Route path='post/:id/:id_event?' element={
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

