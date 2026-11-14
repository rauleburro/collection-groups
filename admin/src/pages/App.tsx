import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Groups from './Groups';

import { Page } from '@strapi/strapi/admin';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Groups />} />

      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };
