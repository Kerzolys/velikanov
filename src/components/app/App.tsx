import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { Admin } from '../../pages/admin/admin';
import { useDispatch, useSelector } from 'services/store/store';
import { initializeAuth, userSelector } from 'features/userSlice/userSlice';
import { AdminSignIn } from 'pages/admin/sign-in/sign-in';
import { AdminSignUp } from 'pages/admin/sign-up/sign-up';
import { AdminCalendar } from 'pages/admin/admin-calendar/admin-calendar';
import { fetchEvents } from 'features/eventsSlice/eventsSlice';
import { AdminBio } from 'pages/admin/admin-bio/admin-bio';
import { AdminGallery } from 'pages/admin/admin-gallery/admin-gallery';
import { AdminMedia } from 'pages/admin/admin-media/admin-media';
import { fetchBio } from 'features/bioSlice/bioSlice';
import { fetchVideos } from 'features/mediaSlice/mediaSlice';
import { fetchPhotos } from 'features/gallerySlice/gallerySlice';
import { OnlyAuth, OnlyUnAuth } from 'admin/components/protected-route/protected-route';

function App() {
  const { isAuthenticated } = useSelector(userSelector)
  const dispatch = useDispatch()
  console.log(isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(initializeAuth());
    }
  }, [dispatch, isAuthenticated])
  useEffect(() => {
    dispatch(fetchEvents())
    dispatch(fetchBio())
    dispatch(fetchVideos())
    dispatch(fetchPhotos())
  }, [dispatch])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/admin/' element={<Admin />} />
        <Route path='/admin/signin' element={<OnlyUnAuth component={<AdminSignIn />} />} />
        <Route path='/admin/signup' element={<AdminSignUp />} />
        <Route path='/admin/calendar' element={<OnlyAuth component={<AdminCalendar />} />} />
        <Route path='/admin/about' element={<OnlyAuth component={<AdminBio />} />} />
        <Route path='/admin/gallery' element={<OnlyAuth component={<AdminGallery />} />} />
        <Route path='/admin/media' element={<OnlyAuth component={<AdminMedia />} />} />
      </Routes>
    </>

  );
}

export default App;
