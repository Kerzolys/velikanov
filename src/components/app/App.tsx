import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { Admin } from '../../pages/admin/admin';
import { useDispatch, useSelector } from 'services/store/store';
import { initializeAuth, userSelector } from 'features/userSlice/userSlice';
import { AdminSignIn } from 'pages/admin/sign-in/sign-in';
import { AdminSignUp } from 'pages/admin/sign-up/sign-up';
import { AdminCalendar } from 'pages/admin/calendar/calendar';
import { fetchEvents } from 'features/eventsSlice/eventsSlice';
import { AdminBio } from 'pages/admin/bio/bio';
import { AdminGallery } from 'pages/admin/gallery/gallery';
import { AdminMedia } from 'pages/admin/media/media';
import { fetchBio } from 'features/bioSlice/bioSlice';
import { fetchVideos } from 'features/mediaSlice/mediaSlice';

function App() {
  const { isAuthenticated } = useSelector(userSelector)
  const dispatch = useDispatch()
  // console.log(isAuthenticated)

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])
  useEffect(() => {
    dispatch(fetchEvents())
    dispatch(fetchBio())
    dispatch(fetchVideos())
  }, [dispatch])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/admin/' element={<Admin />} />
        <Route path='/admin/signin' element={<AdminSignIn />} />
        <Route path='/admin/signup' element={<AdminSignUp />} />
        <Route path='/admin/calendar' element={<AdminCalendar />} />
        <Route path='/admin/about' element={<AdminBio />} />
        <Route path='/admin/gallery' element={<AdminGallery />} />
        <Route path='/admin/media' element={<AdminMedia />} />

      </Routes>
    </>

  );
}

export default App;
