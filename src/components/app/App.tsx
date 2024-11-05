import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { PageNotFound } from '../../pages/page-not-found/page-not-found';
import { Admin } from '../../pages/admin/admin';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </>

  );
}

export default App;
