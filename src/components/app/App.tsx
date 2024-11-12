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

function App() {
  const { isAuthenticated } = useSelector(userSelector)
  const dispatch = useDispatch()
  // console.log(isAuthenticated)

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])
  useEffect(() => {
    dispatch(fetchEvents())
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
      </Routes>
    </>

  );
}

export default App;
