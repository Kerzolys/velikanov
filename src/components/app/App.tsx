import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { About } from '../../pages/about/about';
import { Calendar } from '../../pages/calendar/calendar';
import { Media } from '../../pages/media/media';
import { Contact } from '../../pages/contact/contact';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { Admin } from '../../pages/admin/admin';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </>

  );
}

export default App;
